const defaultCSC = `SELECT * FROM List_UpgradeEngineCSC WHERE EngineID = 191`;
const defaultDSC = `SELECT * FROM List_UpgradeEngineDSC WHERE EngineID = 62`;
const defaultST = `SELECT * FROM List_UpgradeEngineTurboSingle WHERE EngineID = 129`;
const defaultTT = `SELECT * FROM List_UpgradeEngineTurboTwin WHERE EngineID = 199`;
const defaultInt = `SELECT * FROM List_UpgradeEngineIntercooler WHERE EngineID = 1`;

const insertCSC = `INSERT INTO List_UpgradeEngineCSC (Id, EngineID, Level, IsStock, ManufacturerID, PartsStringID, MassDiff, WeightDistDiff, DragScale, WindInstabilityScale, Price, ZeroRPMScale, RedlineRPMScale, RobScale, TorqueDropOffRPM0, TorqueDropOffRPM1, TorqueDropOffScale0, TorqueDropOffScale1) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const insertDSC = `INSERT INTO List_UpgradeEngineDSC (Id, EngineID, Level, IsStock, ManufacturerID, PartsStringID, MassDiff, WeightDistDiff, DragScale, WindInstabilityScale, Price, ZeroRPMScale, RedlineRPMScale, RobScale, TorqueDropOffRPM0, TorqueDropOffRPM1, TorqueDropOffScale0, TorqueDropOffScale1) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const insertST = `INSERT INTO List_UpgradeEngineTurboSingle (Id, EngineID, Level, IsStock, ManufacturerID, MassDiff, WeightDistDiff, Price, MomentInertia, MaxScale, PowerMaxScale, MinScale, PowerMinScale, RobScale, TorqueDropOffRPM0, TorqueDropOffRPM1, TorqueDropOffScale0, TorqueDropOffScale1) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const insertTT = `INSERT INTO List_UpgradeEngineTurboTwin (Id, EngineID, Level, IsStock, ManufacturerID, MassDiff, WeightDistDiff, Price, MomentInertia, MaxScale, PowerMaxScale, MinScale, PowerMinScale, RobScale, TorqueDropOffRPM0, TorqueDropOffRPM1, TorqueDropOffScale0, TorqueDropOffScale1) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const insertInt = `INSERT INTO List_UpgradeEngineIntercooler (Id, EngineID, Level, IsStock, ManufacturerID, PartsStringID, MassDiff,  WeightDistDiff, DragScale, WindInstabilityScale, Price, MaxScaleScale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

function addAspirations(databases, dbOg) {
  databases.forEach((database) => {
    database.data.all(`SELECT * FROM Data_Engine`, function (error, engineRows) {
      if (error) {
        return console.error(error.message);
      }
      engineRows.forEach((engineRow) => {
        const cscRows = database.data.all(`SELECT * FROM List_UpgradeEngineCSC WHERE EngineID = ${engineRow.EngineID}`);
        if (cscRows.length === 0) {
          dbOg.all(defaultCSC, function (erro, defaultCSCRows) {
            if (erro) {
              return console.error(erro.message);
            }
            defaultCSCRows.forEach((row, i) => {
              const values = [engineRow.EngineID * 1000 + i + 1, engineRow.EngineID, row.Level, 0, row.ManufacturerID, row.PartsStringID, row.MassDiff, row.WeightDistDiff, row.DragScale, row.WindInstabilityScale, row.Price, row.ZeroRPMScale, row.RedlineRPMScale, row.RobScale, row.TorqueDropOffRPM0, row.TorqueDropOffRPM1, row.TorqueDropOffScale0, row.TorqueDropOffScale1];
              console.log(`List_UpgradeEngineCSC ${engineRow.MediaName} for ${database.name}`);
              // database.data.run(insertCSC, values, function (err) {
              //   if (err) {
              //     return console.error(`An error occurred while updating List_UpgradeEngineCSC ${engineRow.MediaName} for ${database.name}`, error);
              //   }
              //   console.log(`List_UpgradeEngineCSC ${engineRow.MediaName} updated successfully for ${database.name}`);
              // });
            });
          });
        }
        const dscRows = database.data.all(`SELECT * FROM List_UpgradeEngineDSC WHERE EngineID = ${engineRow.EngineID}`);
        if (dscRows.length === 0) {
          dbOg.all(defaultDSC, function (erro, defaultDSCRows) {
            if (erro) {
              return console.error(erro.message);
            }
            defaultDSCRows.forEach((row, i) => {
              const values = [engineRow.EngineID * 1000 + i + 1, engineRow.EngineID, row.Level, 0, row.ManufacturerID, row.PartsStringID, row.MassDiff, row.WeightDistDiff,
              row.DragScale, row.WindInstabilityScale, row.Price, row.ZeroRPMScale, row.RedlineRPMScale,
              row.RobScale, row.TorqueDropOffRPM0, row.TorqueDropOffRPM1, row.TorqueDropOffScale0, row.TorqueDropOffScale1];
              console.log(`List_UpgradeEngineCSC ${engineRow.MediaName} for ${database.name}`);
              // database.data.run(insertDSC, values, function (err) {
              //   if (err) {
              //     return console.error(`An error occurred while updating List_UpgradeEngineDSC ${engineRow.MediaName} for ${database.name}`, error);
              //   }
              //   console.log(`List_UpgradeEngineDSC ${engineRow.MediaName} updated successfully for ${database.name}`);
              // });
            });
          });
        }
        const stRows = database.data.all(`SELECT * FROM List_UpgradeEngineTurboSingle WHERE EngineID = ${engineRow.EngineID}`)
        if (stRows.length === 0) {
          dbOg.all(defaultST, function (erro, defaultSTRows) {
            if (erro) {
              return console.error(erro.message);
            }
            defaultSTRows.forEach((row, i) => {
              const values = [engineRow.EngineID * 1000 + i + 1, engineRow.EngineID, row.Level, 0, row.ManufacturerID, row.MassDiff, row.WeightDistDiff, row.Price, row.MomentInertia, row.MaxScale, row.PowerMaxScale, row.MinScale, row.PowerMinScale, row.RobScale, row.TorqueDropOffRPM0, row.TorqueDropOffRPM1, row.TorqueDropOffScale0, row.TorqueDropOffScale1];
              console.log(`List_UpgradeEngineCSC ${engineRow.MediaName} for ${database.name}`);
              // database.data.run(insertST, values, function (err) {
              //   if (err) {
              //     return console.error(`An error occurred while updating List_UpgradeEngineTurboSingle ${engineRow.MediaName} for ${database.name}`, error);
              //   }
              //   console.log(`List_UpgradeEngineTurboSingle ${engineRow.MediaName} updated successfully for ${database.name}`);
              // });
            });
          });
        }
        const ttRows = database.data.all(`SELECT * FROM List_UpgradeEngineTurboTwin WHERE EngineID = ${engineRow.EngineID}`)
        if (ttRows.length === 0) {
          dbOg.all(defaultTT, function (erro, defaultTTRows) {
            if (erro) {
              return console.error(erro.message);
            }
            defaultTTRows.forEach((row, i) => {
              const values = [engineRow.EngineID * 1000 + i + 1, engineRow.EngineID, row.Level, 0, row.ManufacturerID, row.MassDiff, row.WeightDistDiff, row.Price, row.MomentInertia, row.MaxScale, row.PowerMaxScale, row.MinScale, row.PowerMinScale, row.RobScale, row.TorqueDropOffRPM0, row.TorqueDropOffRPM1, row.TorqueDropOffScale0, row.TorqueDropOffScale1];
              console.log(`List_UpgradeEngineCSC ${engineRow.MediaName} for ${database.name}`);
              // database.data.run(insertTT, values, function (err) {
              //   if (err) {
              //     return console.error(`An error occurred while updating List_UpgradeEngineTurboTwin ${engineRow.MediaName} for ${database.name}`, error);
              //   }
              //   console.log(`List_UpgradeEngineTurboTwin ${engineRow.MediaName} updated successfully for ${database.name}`);
              // });
            });
          });
        }
        const intRows = database.data.all(`SELECT * FROM List_UpgradeEngineIntercooler WHERE EngineID = ${engineRow.EngineID}`);
        if (intRows.length === 0) {
          dbOg.all(defaultInt, function (erro, defaultIntRows) {
            if (erro) {
              return console.error(erro.message);
            }
            defaultIntRows.forEach((row, i) => {
              const values = [engineRow.EngineID * 1000 + i + 1, engineRow.EngineID, row.Level, 0, row.ManufacturerID, row.PartsStringID, row.MassDiff, row.WeightDistDiff, row.DragScale, row.WindInstabilityScale, row.Price, row.MaxScaleScale];
              console.log(`List_UpgradeEngineCSC ${engineRow.MediaName} for ${database.name}`);
              // database.data.run(insertInt, values, function (err) {
              //   if (err) {
              //     return console.error(`An error occurred while updating List_UpgradeEngineIntercooler ${engineRow.MediaName} for ${database.name}`, error);
              //   }
              //   console.log(`List_UpgradeEngineIntercooler ${engineRow.MediaName} updated successfully for ${database.name}`);
              // });
            });
          });
        }
      });
    });
  });
}

module.exports = addAspirations;