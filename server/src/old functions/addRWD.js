const nonRWDCars = `SELECT * FROM Data_Car WHERE PowertrainID = 0 OR PowertrainID = 4 OR PowertrainID = 5 OR PowertrainId = 6`;

const insertRWD = `INSERT INTO List_UpgradeDrivetrain (Id, Ordinal, DrivetrainID, PowertrainID, MassDiff, WeightDistDiff, Level, ManufacturerId, Price, IsStock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

function addRWD(databases, dbOg) {
  databases.forEach((database) => {
    database.data.all(nonRWDCars, function (error, rows) {
      if (error) {
        return console.error(error.message);
      }
      rows.forEach((row) => {
        database.data.all(`SELECT * FROM List_UpgradeDrivetrain WHERE Ordinal = ${row.Id}`, function (erro, drivetrainRows) {
          if (erro) {
            return console.error(erro.message);
          }
          const filteredDrivetrainRows = drivetrainRows.filter(drivetrainRow => [1, 2, 3].includes(drivetrainRow.PowertrainId));
          if (filteredDrivetrainRows.length === 0) {
            let powertrain;
            if (row.PowertrainID === 0 || row.PowertrainID === 4) {
              powertrain = 1;
            } else if (row.PowertrainID === 5) {
              powertrain = 2;
            } else {
              powertrain = 3;
            }
            if (row !== undefined) {
              const values = [row.Id * 1000 + drivetrainRows.length, row.Id, 56, powertrain, 0.0, 0.0, 1, row.MakeID, 0, 0];
              database.data.run(insertRWD, values, function (err) {
                if (err) {
                  return console.error(`An error occurred while updating: List_UpgradeDrivetrain ${row.MediaName} for ${database.name}`, error);
                }
                console.log(`List_UpgradeDrivetrain ${row.MediaName} updated successfully for ${database.name}`);
              });
            }
          }
        });
      })
    });
  })
}

module.exports = addRWD;