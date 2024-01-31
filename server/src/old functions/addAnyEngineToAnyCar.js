const sqlite3 = require('sqlite3');
const readline = require('readline');

const myDb = new sqlite3.Database('../../carsDb.db');

const insertEngine = `INSERT INTO List_UpgradeEngine (Id, Ordinal, Level, EngineID, IsStock, ManufacturerID, Price, MassDiff,  WeightDistDiff, DragScale, WindInstabilityScale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let selectedOrder = 'MediaName';
let selectedEngine = '';
let selectedCar = '';

function displayCars(order, selected) {
  myDb.all(`SELECT * FROM Car_Index ORDER BY ${order}`, function (error, rows) {
    if (error) {
      return console.error('Here ', error);
    }
    if (selected) {
      if (selectedEngine === '') {
        selectedEngine = rows[selected - 1];
        console.log(`${rows[selected - 1].EngineName} selected`);
      } else {
        selectedCar = rows[selected - 1];
        if (selectedEngine.Id === selectedCar.Id) {
          console.log('Selected engine and car must be different');
          selectedCar = '';
        } else {
          const rl2 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          rl2.question(`Confirm y add ${selectedEngine.EngineName} to ${selectedCar.MediaName}`, function (option) {
            switch (option) {
              case 'y':
                addEngine(selectedEngine, selectedCar);
                break;
              default:
                selectedEngine = '';
                selectedCar = '';
                console.log('Selection reseted');
                break;
            }
            rl2.close();
          });
        }
      }
    } else {
      rows.forEach((row, i) => {
        console.log(`${i + 1} ${row.MediaName}${'-'.repeat(28 - row.MediaName.length)} Hp:${row.Power}${' '.repeat(4 - row.Power.toString().length)} lb/ft:${row.Torque}${' '.repeat(4 - row.Torque.toString().length)} ${row.EngineName}`);
      });
      console.log('Order By');
      console.log('m. Media Name');
      console.log('h. Hp');
      console.log('t. Torque');
      console.log('0. Exit');
    }
  })
}

function promptInput() {
  rl.question('Enter your choice: ', function (option) {
    handleInput(option);
    if (option !== '0') {
      promptInput();
    } else {
      rl.close();
    }
  });
}

function handleInput(option) {
  switch (option) {
    case 'm':
      console.log('Order By Media Name Selected');
      selectedOrder = 'MediaName';
      displayCars(selectedOrder);
      break;
    case 'h':
      console.log('Order By Hp Selected');
      selectedOrder = 'Power';
      displayCars(selectedOrder);
      break;
    case 't':
      console.log('Order By Torque Selected');
      selectedOrder = 'Torque';
      displayCars(selectedOrder);
      break;
    case '0':
      console.log('Exiting');
      break;
    default:
      const numberInput = Number(option);
      if (Number.isInteger(numberInput) && numberInput >= 0 && numberInput <= 672) {
        displayCars(selectedOrder, numberInput);
      } else {
        console.log('Invalid option');
      }
      break;
  }
}

(function startMenu() {
  displayCars(selectedOrder);
  promptInput();
})();

function addEngine(selectedEngine, selectedCar) {
  let db;
  switch (selectedCar.Source) {
    case '2013 SRT Viper Pack':
      db = new sqlite3.Database('../databases/2013 SRT Viper Pack/media/db/patch/36000_merge.slt');
      break;
    case 'April Alpinestars Car Pack':
      db = new sqlite3.Database('../databases/April Alpinestars Car Pack/media/db/patch/31000_merge.slt');
      break;
    case 'August Playseat Car Pack':
      db = new sqlite3.Database('../databases/August Playseat Car Pack/media/db/patch/38000_merge.slt');
      break;
    case 'December IGN Pack':
      db = new sqlite3.Database('../databases/December IGN Pack/media/db/patch/26000_merge.slt');
      break;
    case 'February American Le Mans Series Pack':
      db = new sqlite3.Database('../databases/February American Le Mans Series Pack/media/db/patch/29000_merge.slt');
      break;
    case 'Hyundai Veloster Bonus Pack':
      db = new sqlite3.Database('../databases/Hyundai Veloster Bonus Pack/media/db/patch/28000_merge.slt');
      break;
    case 'January Jalopnik Pack':
      db = new sqlite3.Database('../databases/January Jalopnik Pack/media/db/patch/27000_merge.slt');
      break;
    case 'July Car Pack':
      db = new sqlite3.Database('../databases/July Car Pack/media/db/patch/37000_merge.slt');
      break;
    case 'June Meguiar\'s Car Pack':
      db = new sqlite3.Database('../databases/June Meguiar\'s Car Pack/media/db/patch/35000_merge.slt');
      break;
    case 'Limited Collector\'s Edition Pack':
      db = new sqlite3.Database('../databases/Limited Collector\'s Edition Pack/media/db/patch/23000_merge.slt');
      break;
    case 'Main DB':
      db = new sqlite3.Database('../databases/Main DB/gamedb.slt');
      break;
    case 'March Pirelli Car Pack':
      db = new sqlite3.Database('../databases/March Pirelli Car Pack/media/db/patch/30000_merge.slt');
      break;
    case 'May TopGear Car Pack':
      db = new sqlite3.Database('../databases/May TopGear Car Pack/media/db/patch/32000_merge.slt');
      break;
    case 'November Speed Pack':
      db = new sqlite3.Database('../databases/November Speed Pack/media/db/patch/23552000_merge.slt');
      break;
    case 'Porsche Expansion Pack':
      db = new sqlite3.Database('../databases/Porsche Expansion Pack/media/db/patch/34000_merge.slt');
      break;
    case 'September Pennzoil Car Pack':
      db = new sqlite3.Database('../databases/September Pennzoil Car Pack/media/db/patch/39000_merge.slt');
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
        db.all(`SELECT * FROM List_UpgradeEngine WHERE Ordinal = ${selectedCar.Id}`, function (erro, allCarEngines) {
          if (error) {
            console.error('An error occurred:', error);
          } else {
            const values = [selectedCar.Id * 1000 + allCarEngines.length + 1, selectedCar.Id, 1, selectedEngine.EngineID, 0, selectedEngine.ManufacturerID, 10000, 20.0, 0.0, 1.0, 1.0];
            console.log(values);
            db.run(insertEngine, values, function (err) {
              if (err) {
                return console.error(`An error ocurred while updating ${selectedEngine.EngineName} to ${selectedCar.MediaName} for ${selectedCar.Source}`, err);
              }
              console.log(`${selectedEngine.EngineID} ${selectedEngine.EngineName} to ${selectedCar.Id} ${selectedCar.MediaName} added succesfully for ${selectedCar.Source}`);
            });
          }
        });
      }
    }
  });
}