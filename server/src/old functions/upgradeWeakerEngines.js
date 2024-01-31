const enginesIds = [977, 895, 990, 1021, 972, 717, 923, 563, 924, 528, 1034, 83, 168, 1049, 991, 949, 840, 555, 36, 552, 758, 837, 947, 546, 100, 413, 942, 820, 968, 941, 513, 969, 2, 809, 944, 946, 736, 834, 1024, 785, 496, 847, 967, 752, 884, 499, 107, 759, 390, 77, 62, 1046, 232, 919, 500, 1, 921, 43, 824, 21, 751, 757, 902, 572, 73, 662, 945, 97, 486, 267, 796, 63, 392, 1018, 730, 548, 608, 940, 762, 859, 108, 5, 839, 815, 680, 534, 493, 541, 878, 855, 90, 604, 35, 729, 903, 467, 74, 686, 53, 460, 519, 791];

const tablesList = ['Displacement', 'Exhaust', 'FuelSystem', 'Ignition', 'Intake', 'Manifold', 'OilCooling', 'PistonsCompression', 'Valves'];

function upgradeWeakerEngines(databases) {
  enginesIds.forEach((engineId) => {
    databases.forEach((database) => {
      database.data.all(`SELECT * FROM Data_Engine WHERE EngineID = ${engineId}`, function (error, selectedEngine) {
        if (error) {
          console.error(error);
        } else {
          if (selectedEngine[0] !== undefined) {
            tablesList.forEach((table) => {
              database.data.all(`SELECT * FROM List_UpgradeEngine${table} WHERE EngineID = ${engineId} AND Level = 3`, function (erro, info) {
                if (erro) {
                  console.error(erro);
                } else {
                  if (info[0] !== undefined) {
                    const updatedValue = info[0].TorqueScale * 1.3;
                    // database.data.run(`UPDATE List_UpgradeEngine${table} SET TorqueScale = ${updatedValue} WHERE EngineID = ${engineId} AND Level = 3`, (err) => {
                    //   if (err) {
                    //     console.error(`An error occurred while updating: List_UpgradeEngine${table} ${selectedEngine[0].MediaName} for ${database.name}`, error);
                    //   } else {
                    //     console.log(`List_UpgradeEngine${table} ${selectedEngine[0].MediaName} updated successfully for ${database.name}`);
                    //   }
                    // })
                  }
                }
              })
            })
            database.data.all(`SELECT * FROM List_UpgradeEngineCamshaft WHERE EngineID = ${engineId} AND Level = 3`, function (erro, info) {
              if (erro) {
                console.error(erro);
              } else {
                if (info[0] !== undefined) {
                  const redlineRPM = info[0].RedlineRPM + 700;
                  const torqueCurveMaxRPM = info[0].TorqueCurveMaxRPM + 700;
                  // database.data.run(`UPDATE List_UpgradeEngineCamshaft SET RedlineRPM = ${redlineRPM}, TorqueCurveMaxRPM = ${torqueCurveMaxRPM} WHERE EngineID = ${engineId} AND Level = 3`, (err) => {
                  //   if (err) {
                  //     console.error(`An error occurred while updating: List_UpgradeEngineCamshaft ${selectedEngine[0].MediaName} for ${database.name}`, error);
                  //   } else {
                  //     console.log(`List_UpgradeEngineCamshaft ${selectedEngine[0].MediaName} updated successfully for ${database.name}`);
                  //   }
                  // })
                }
              }
            })
          }
        }
      })
    })
  })
}

module.exports = upgradeWeakerEngines;

// List_UpgradeEngineCamshaft.RedlineRPM EngineID
// List_UpgradeEngineCamshaft.TorqueCurveMaxRPM EngineID
// List_UpgradeEngineDisplacement.TorqueScale 
// List_UpgradeEngineExhaust.TorqueScale
// List_UpgradeEngineFuelSystem.TorqueScale
// List_UpgradeEngineIgnition.TorqueScale
// List_UpgradeEngineIntake.TorqueScale
// List_UpgradeEngineManifold.TorqueScale
// List_UpgradeEngineOilCooling.TorqueScale
// List_UpgradeEnginePistonsCompression.TorqueScale
// List_UpgradeEngineValves.TorqueScale