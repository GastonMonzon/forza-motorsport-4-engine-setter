const createDrivetrainsTable = `CREATE TABLE "List_UpgradeDrivetrain" (
	"Id"	INTEGER,
	"Ordinal"	INT,
	"DrivetrainID"	INT,
	"PowertrainId"	INT,
	"MassDiff"	REAL,
	"WeightDistDiff"	REAL,
	"Level"	INT,
	"ManufacturerId"	INT,
	"Price"	INT,
	"IsStock"	INT,
	PRIMARY KEY("Id")
);`;

const createCSCTable = `CREATE TABLE "List_UpgradeEngineCSC" (
	"Id"	INTEGER,
	"EngineID"	INT,
	"Level"	INT,
	"IsStock"	INT,
	"ManufacturerID"	INT,
	"PartsStringID"	INT,
	"MassDiff"	REAL,
	"WeightDistDiff"	REAL,
	"DragScale"	REAL,
	"WindInstabilityScale"	REAL,
	"Price"	INT,
	"ZeroRPMScale"	REAL,
	"RedlineRPMScale"	REAL,
	"RobScale"	REAL,
	"TorqueDropOffRPM0"	REAL,
	"TorqueDropOffRPM1"	REAL,
	"TorqueDropOffScale0"	REAL,
	"TorqueDropOffScale1"	REAL,
	PRIMARY KEY("Id")
);`;

const createDSCTable = `CREATE TABLE "List_UpgradeEngineDSC" (
	"Id"	INTEGER,
	"EngineID"	INT,
	"Level"	INT,
	"IsStock"	INT,
	"ManufacturerID"	INT,
	"PartsStringID"	INT,
	"MassDiff"	REAL,
	"WeightDistDiff"	REAL,
	"DragScale"	REAL,
	"WindInstabilityScale"	REAL,
	"Price"	INT,
	"ZeroRPMScale"	REAL,
	"RedlineRPMScale"	REAL,
	"RobScale"	REAL,
	"TorqueDropOffRPM0"	REAL,
	"TorqueDropOffRPM1"	REAL,
	"TorqueDropOffScale0"	REAL,
	"TorqueDropOffScale1"	REAL,
	PRIMARY KEY("Id")
);`;

const createSTTable = `CREATE TABLE "List_UpgradeEngineTurboSingle" (
	"Id"	INTEGER,
	"EngineID"	INT,
	"Level"	INT,
	"IsStock"	INT,
	"ManufacturerID"	INT,
	"MassDiff"	REAL,
	"WeightDistDiff"	REAL,
	"Price"	INT,
	"MomentInertia"	REAL,
	"MaxScale"	REAL,
	"PowerMaxScale"	REAL,
	"MinScale"	REAL,
	"PowerMinScale"	REAL,
	"RobScale"	REAL,
	"TorqueDropOffRPM0"	REAL,
	"TorqueDropOffRPM1"	REAL,
	"TorqueDropOffScale0"	REAL,
	"TorqueDropOffScale1"	REAL,
	PRIMARY KEY("Id")
);`;

const createTTTable = `CREATE TABLE "List_UpgradeEngineTurboTwin" (
	"Id"	INTEGER,
	"EngineID"	INT,
	"Level"	INT,
	"IsStock"	INT,
	"ManufacturerID"	INT,
	"MassDiff"	REAL,
	"WeightDistDiff"	REAL,
	"Price"	INT,
	"MomentInertia"	REAL,
	"MaxScale"	REAL,
	"PowerMaxScale"	REAL,
	"MinScale"	REAL,
	"PowerMinScale"	REAL,
	"RobScale"	REAL,
	"TorqueDropOffRPM0"	REAL,
	"TorqueDropOffRPM1"	REAL,
	"TorqueDropOffScale0"	REAL,
	"TorqueDropOffScale1"	REAL,
	PRIMARY KEY("Id")
);`;

const createInterTable = `CREATE TABLE "List_UpgradeEngineIntercooler" (
	"Id"	INTEGER,
	"EngineID"	INT,
	"Level"	INT,
	"IsStock"	INT,
	"ManufacturerID"	INT,
	"PartsStringID"	INT,
	"MassDiff"	REAL,
	"WeightDistDiff"	REAL,
	"DragScale"	REAL,
	"WindInstabilityScale"	REAL,
	"Price"	INT,
	"MaxScaleScale"	REAL,
	PRIMARY KEY("Id")
);`;

const tableNames = ['List_UpgradeDrivetrain', 'List_UpgradeEngineCSC', 'List_UpgradeEngineDSC', 'List_UpgradeEngineTurboSingle', 'List_UpgradeEngineTurboTwin', 'List_UpgradeEngineIntercooler'];

function createNecessaryTables(databases) {
  databases.forEach((database) => {
    tableNames.forEach(tableName => {

      checkTableExists(database.data, tableName)
        .then((tableExists) => {
          if (!tableExists) {
            console.log(`${tableName} table missing for ${database.name}`);
            createTable(database.data, tableName);
          }
        })
        .catch((error) => {
          console.error(`Error encountered in ${database.name} ${tableName}`, error);
        })
    })
  })
}

function checkTableExists(db, tableName) {
  const query = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`;

  return new Promise((resolve, reject) => {
    db.get(query, function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row !== undefined);
      }
    });
  });
}

function createTable(db, tableToCreate) {
  let createTableString = '';

  switch (tableToCreate) {
    case 'List_UpgradeDrivetrain':
      createTableString = createDrivetrainsTable;
      break;
    case 'List_UpgradeEngineCSC':
      createTableString = createCSCTable;
      break;
    case 'List_UpgradeEngineDSC':
      createTableString = createDSCTable;
      break;
    case 'List_UpgradeEngineTurboSingle':
      createTableString = createSTTable;
      break;
    case 'List_UpgradeEngineTurboTwin':
      createTableString = createTTTable;
      break;
    case 'List_UpgradeEngineIntercooler':
      createTableString = createInterTable;
      break;
  }
  if (createTableString === '') {
    console.log(`Error: No match on table name`);
  } else {
    db.run(createTableString, function (error) {
      if (error) {
        console.error(error.message);
      } else {
        console.log(`${tableToCreate} table created successfully`);
      }
    });
  }
}

module.exports = { createNecessaryTables, checkTableExists };
