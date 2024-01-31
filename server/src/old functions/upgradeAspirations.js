function upgradeAspirations(databases) {
  databases.forEach((database) => {
    database.data.all(`SELECT * FROM List_UpgradeEngineCSC`, function (error, cscRows) {
      if (error) {
        console.error('An error occurred:', error);
      } else {
        cscRows.forEach((row) => {
          const updatedValue = row.RedlineRPMScale * 1.2;
          // database.data.run(`UPDATE List_UpgradeEngineCSC SET RedlineRPMScale = ${updatedValue} WHERE Id = ${row.Id}`, (erro) => {
          //   if (erro) {
          //     console.error(`An error occurred while updating: List_UpgradeEngineCSC ${row.Id} for ${database.name}`, error);
          //   } else {
          //     console.log(`List_UpgradeEngineCSC ${row.Id} updated successfully for ${database.name}`);
          //   }
          // });
        });
      }
    });
    database.data.all(`SELECT * FROM List_UpgradeEngineDSC`, function (error, cscRows) {
      if (error) {
        console.error('An error occurred:', error);
      } else {
        cscRows.forEach((row) => {
          const updatedValue = row.RedlineRPMScale * 1.15;
          // database.data.run(`UPDATE List_UpgradeEngineDSC SET RedlineRPMScale = ${updatedValue} WHERE Id = ${row.Id}`, (error) => {
          //   if (error) {
          //     console.error(`An error occurred while updating List_UpgradeEngineDSC ${row.Id} for ${database.name}`, error);
          //   } else {
          //     console.log(`List_UpgradeEngineDSC ${row.Id} updated successfully for ${database.name}`);
          //   }
          // });
        });
      }
    });
    database.data.all(`SELECT * FROM List_UpgradeEngineTurboSingle`, function (error, cscRows) {
      if (error) {
        console.error('An error occurred:', error);
      } else {
        cscRows.forEach((row) => {
          const updatedValue = row.MinScale * 0.9;
          // database.data.run(`UPDATE List_UpgradeEngineTurboSingle SET MinScale = ${updatedValue} WHERE Id = ${row.Id}`, (error) => {
          //   if (error) {
          //     console.error(`An error occurred while updating List_UpgradeEngineTurboSingle ${row.Id} for ${database.name}`, error);
          //   } else {
          //     console.log(`List_UpgradeEngineTurboSingle ${row.Id} updated successfully for ${database.name}`);
          //   }
          // });
        });
      }
    });
  });
}

module.exports = upgradeAspirations;