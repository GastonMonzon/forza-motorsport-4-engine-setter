const sqlite3 = require('sqlite3');

const myDb = new sqlite3.Database('../../../carsDb.db');
const { checkTableExists } = require('./createNecessaryTables.js')

const createTable = `CREATE TABLE "Car_Index" (
  "Id" INTEGER UNIQUE,
	"EngineID" INTEGER,
	"ManufacturerID" INTEGER,
	"MediaName"	TEXT,
	"EngineName" TEXT,
	"Power"	INTEGER,
	"Torque" INTEGER,
	"Source" TEXT,
	PRIMARY KEY("Id")
);`;

const selectInfo = `SELECT Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Car.MediaName, Data_Engine.EngineName, Data_Engine.EngineGraphingMaxPower, Data_Engine.EngineGraphingMaxTorque
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName`;

const insertInfo = `INSERT INTO Car_Index (Id, EngineID, ManufacturerID, MediaName, EngineName, Power, Torque, Source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

function createCarIndex(databases) {
  checkTableExists(myDb, 'Car_Index')
    .then((tableExists) => {
      if (!tableExists) {
        console.log(`Car_Index table missing`);
        myDb.run(createTable, function (error) {
          if (error) {
            console.error(error.message);
          } else {
            console.log(`Table created successfully`);
          }
        });
      } else {
        console.log(`Car_Index table already exists`);
      }
    })
    .catch((error) => {
      console.error(`Error encountered creating Car_Index`, error);
    })

  setTimeout(() => {
    databases.forEach((database) => {
      database.data.all(selectInfo, function (error, rows) {
        if (error) {
          console.error('An error occurred:', error);
        } else {
          rows.forEach(row => {
            const values = [row.Id, row.EngineID, row.MakeID, row.MediaName, row.EngineName, Math.round(row.EngineGraphingMaxPower), Math.round(row.EngineGraphingMaxTorque), database.name];
            myDb.run(insertInfo, values, function (err) {
              if (err) {
                return console.error(`An error ocurred while inserting ${row.EngineName} from ${database.name}`, err);
              }
              console.log(`${row.EngineName} added succesfully from ${database.name}`);
            });
          });
        }
      });
    });
  }, 3500);
}

module.exports = createCarIndex;