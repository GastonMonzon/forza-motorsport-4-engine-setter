const sqlite3 = require('sqlite3');
const readline = require('readline');

const addRWD = require('./addRWD');
const addAspirations = require('./addAspirations');
const upgradeAspirations = require('./upgradeAspirations');
const addJapanEngines = require('./addJapanEngines');
const upgradeWeakerEngines = require('./upgradeWeakerEngines');
const { createNecessaryTables } = require('./createNecessaryTables');
const createCarIndex = require('./createCarIndex');
const addUpgradeEngine = require('./addUpgradeEngine');
const addDisplacementAndAspirationToCarIndex = require('./addDisplacementAndAspirationToCarIndex');

const dbOg = new sqlite3.Database('../databases/Main DB/gamedb.slt');
const databases = [
  {
    name: 'Main DB',
    data: new sqlite3.Database('../databases/Main DB/gamedb.slt')
  },
  {
    name: '2013 SRT Viper Pack',
    data: new sqlite3.Database('../databases/2013 SRT Viper Pack/media/db/patch/36000_merge.slt')
  },
  {
    name: 'April Alpinestars Car Pack',
    data: new sqlite3.Database('../databases/April Alpinestars Car Pack/media/db/patch/31000_merge.slt')
  },
  {
    name: 'August Playseat Car Pack',
    data: new sqlite3.Database('../databases/August Playseat Car Pack/media/db/patch/38000_merge.slt')
  },
  {
    name: 'December IGN Pack',
    data: new sqlite3.Database('../databases/December IGN Pack/media/db/patch/26000_merge.slt')
  },
  {
    name: 'February American Le Mans Series Pack',
    data: new sqlite3.Database('../databases/February American Le Mans Series Pack/media/db/patch/29000_merge.slt')
  },
  {
    name: 'Hyundai Veloster Bonus Pack',
    data: new sqlite3.Database('../databases/Hyundai Veloster Bonus Pack/media/db/patch/28000_merge.slt')
  },
  {
    name: 'January Jalopnik Pack',
    data: new sqlite3.Database('../databases/January Jalopnik Pack/media/db/patch/27000_merge.slt')
  },
  {
    name: 'July Car Pack',
    data: new sqlite3.Database('../databases/July Car Pack/media/db/patch/37000_merge.slt')
  },
  {
    name: 'June Meguiar\'s Car Pack',
    data: new sqlite3.Database('../databases/June Meguiar\'s Car Pack/media/db/patch/35000_merge.slt')
  },
  {
    name: 'Limited Collector\'s Edition Pack',
    data: new sqlite3.Database('../databases/Limited Collector\'s Edition Pack/media/db/patch/23000_merge.slt')
  },
  {
    name: 'March Pirelli Car Pack',
    data: new sqlite3.Database('../databases/March Pirelli Car Pack/media/db/patch/30000_merge.slt')
  },
  {
    name: 'May TopGear Car Pack',
    data: new sqlite3.Database('../databases/May TopGear Car Pack/media/db/patch/32000_merge.slt')
  },
  {
    name: 'November Speed Pack',
    data: new sqlite3.Database('../databases/November Speed Pack/media/db/patch/23552000_merge.slt')
  },
  {
    name: 'Porsche Expansion Pack',
    data: new sqlite3.Database('../databases/Porsche Expansion Pack/media/db/patch/34000_merge.slt')
  },
  {
    name: 'September Pennzoil Car Pack',
    data: new sqlite3.Database('../databases/September Pennzoil Car Pack/media/db/patch/39000_merge.slt')
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('=== Console Menu ===');
  console.log('1. Create Necessary Tables');
  console.log('2. Add RWD To All Cars');
  console.log('3. Add All Aspirations To All Cars');
  console.log('4. Upgrade All Aspirations');
  console.log('5. Add Japan Engines');
  console.log('6. Upgrade Weaker Engines');
  console.log('7. Create Car Index');
  console.log('8. Add UpgradeEngine To carsDb');
  console.log('9. Add Displacement & Aspiration To carsDb');
  console.log('0. Exit');
}

function promptInput() {
  rl.question('Enter your choice: ', function (option) {
    handleInput(option, rl);
    if (option !== '0') {
      displayMenu();
      promptInput();
    } else {
      rl.close();
    }
  });
}

function handleInput(option, rl) {
  switch (option) {
    case '1':
      console.log('Create Necessary Tables Selected');
      createNecessaryTables(databases);
      break;
    case '2':
      console.log('Add RWD Selected');
      addRWD(databases, dbOg);
      break;
    case '3':
      console.log('Add Aspirations Selected');
      addAspirations(databases, dbOg);
      break;
    case '4':
      console.log('Upgrade Aspirations Selected');
      upgradeAspirations(databases);
      break;
    case '5':
      console.log('Add Japan Engines Selected');
      addJapanEngines(databases, dbOg);
      break;
    case '6':
      console.log('Upgrade Weaker Engines Selected');
      upgradeWeakerEngines(databases);
      break;
    case '7':
      console.log('Create Car Index Selected');
      createCarIndex(databases);
      break;
    case '8':
      console.log('Add UpgradeEngine To carsDb Selected');
      addUpgradeEngine(databases);
      break;
    case '9':
      console.log('Add Displacement & Aspiration To carsDb Selected');
      addDisplacementAndAspirationToCarIndex(databases);
      break;
    case '0':
      return;
    default:
      console.log('Invalid option');
      break;
  }
}

(function startMenu() {
  displayMenu();
  promptInput();
})();