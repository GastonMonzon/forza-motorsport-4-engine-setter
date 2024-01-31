const sqlite3 = require('sqlite3');

const myDb = new sqlite3.Database('../../../carsDb.db');
const { checkTableExists } = require('./createNecessaryTables.js')

const createTable = `CREATE TABLE "List_UpgradeEngine" (
  "Id"	INTEGER UNIQUE,
	"Ordinal"	INTEGER,
	"EngineID" INTEGER
);`;

const selectInfo = `SELECT Id, Ordinal, EngineID FROM List_UpgradeEngine`;

const insertInfo = `INSERT INTO List_UpgradeEngine (Id, Ordinal, EngineID) VALUES (?, ?, ?)`;

function addUpgradeEngine(databases) {
  checkTableExists(myDb, 'List_UpgradeEngine')
    .then((tableExists) => {
      if (!tableExists) {
        console.log(`List_UpgradeEngine table missing`);
        myDb.run(createTable, function (error) {
          if (error) {
            console.error(error.message);
          } else {
            console.log(`List_UpgradeEngine Table created successfully`);
          }
        });
      } else {
        console.log(`List_UpgradeEngine table already exists`);
      }
    })
    .catch((error) => {
      console.error(`Error encountered creating List_UpgradeEngine`, error);
    })

  setTimeout(() => {
    databases.forEach((database) => {
      database.data.all(selectInfo, function (error, rows) {
        if (error) {
          console.error(`An error occurred in database ${database.name}:`, error);
        } else {
          rows.forEach(row => {
            const values = [row.Id, row.Ordinal, row.EngineID];
            myDb.run(insertInfo, values, function (err) {
              if (err) {
                return console.error(`An error ocurred while inserting ${row.EngineName} from ${database.name}`, err);
              }
              console.log(`${row.Id} added succesfully from ${database.name}`);
            });
          });
        }
      });
    });
  }, 3500);
}

module.exports = addUpgradeEngine;