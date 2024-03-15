const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const myDb = require('../db.js');
const insertEngine = `INSERT INTO List_UpgradeEngine (Id, Ordinal, Level, EngineID, IsStock, ManufacturerID, Price, MassDiff,  WeightDistDiff, DragScale, WindInstabilityScale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const insertEngineIntoCarsDb = `INSERT INTO List_UpgradeEngine (Id, Ordinal, EngineID) VALUES (?, ?, ?)`;

async function postCars(request, response) {
  try {
  const { selectedEngine, selectedCar } = request.body;
    let db;
    switch (selectedCar.Source) {
      case '2013 SRT Viper Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/2013 SRT Viper Pack/media/db/patch/36000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'April Alpinestars Car Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/April Alpinestars Car Pack/media/db/patch/31000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'August Playseat Car Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/August Playseat Car Pack/media/db/patch/38000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'December IGN Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/December IGN Pack/media/db/patch/26000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'February American Le Mans Series Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/February American Le Mans Series Pack/media/db/patch/29000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'Hyundai Veloster Bonus Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/Hyundai Veloster Bonus Pack/media/db/patch/28000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'January Jalopnik Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/January Jalopnik Pack/media/db/patch/27000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'July Car Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/July Car Pack/media/db/patch/37000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'June Meguiar\'s Car Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/June Meguiar\'s Car Pack/media/db/patch/35000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'Limited Collector\'s Edition Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/Limited Collector\'s Edition Pack/media/db/patch/23000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'Main DB':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/Main DB/gamedb.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'March Pirelli Car Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/March Pirelli Car Pack/media/db/patch/30000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'May TopGear Car Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/May TopGear Car Pack/media/db/patch/32000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'November Speed Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/November Speed Pack/media/db/patch/23552000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'Porsche Expansion Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/Porsche Expansion Pack/media/db/patch/34000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      case 'September Pennzoil Car Pack':
        db = new sqlite3.Database(path.resolve(__dirname, '../databases/September Pennzoil Car Pack/media/db/patch/39000_merge.slt'), (err) => {
          if (err) {
            console.error('Error opening 2013 SRT Viper Pack database:', err.message);
          } else {
            console.log('Connected to 2013 SRT Viper Pack database.');
          }
        });
        break;
      default:
        console.log('Error selecting database');
        break;
    }
    db.all(`SELECT * FROM List_UpgradeEngine WHERE Ordinal = ${selectedCar.Id} AND EngineID = ${selectedEngine.EngineID}`, function (error, engine) {
      if (error) {
        console.error('An error occurred:', error);
      } else {
        if (engine[0] === undefined) {
          db.all(`SELECT * FROM List_UpgradeEngine WHERE Ordinal = ${selectedCar.Id}`, function (error, allCarEngines) {
            if (error) {
              console.error('An error occurred:', error);
            } else {
              const values = [selectedCar.Id * 1000 + allCarEngines.length + 1, selectedCar.Id, 1, selectedEngine.EngineID, 0, selectedEngine.ManufacturerID, 10000, 20.0, 0.0, 1.0, 1.0];
              console.log(values);
              // db.run(insertEngine, values, function (error) {
              //   if (error) {
              //     return console.error(`An error ocurred while updating ${selectedEngine.EngineName} to ${selectedCar.MediaName} for ${selectedCar.Source}`, error);
              //   }
              // });
              // myDb.run(insertEngineIntoCarsDb, values, function (error) {
              //   if (error) {
              //     return console.error(`An error ocurred while updating ${selectedEngine.EngineName} to ${selectedCar.MediaName} for ${selectedCar.Source} in cars.db`, error);
              //   }
              // });
              response.status(201).json({ message: `Engine ${selectedEngine.EngineID} ${selectedEngine.EngineName} successfully added to ${selectedCar.Id} ${selectedCar.MediaName} for ${selectedCar.Source}` });
            }
          });
        }
      }
    });
  } catch (error) {
    response.status(404).send({ error, message: 'Error at posting engine' });
  }
}

module.exports = postCars;
