const sqlite3 = require('sqlite3');
const myDb = new sqlite3.Database('../../../carsDb.db');

const selectInfo = `SELECT Id, Displacement, AspirationTypeId FROM Data_Car`;
const insertInfo = `UPDATE Car_Index SET Displacement = ?, Aspiration = ? WHERE Id = ?`;
// const selectInfo = `SELECT Id, EngineName FROM Car_Index`;
// const insertInfo = `UPDATE Car_Index SET EngineType = ? WHERE Id = ?`;

function addDisplacementAndAspirationToCarIndex(databases) {
  databases.forEach((database) => {
    database.data.all(selectInfo, function (error, rows) {
      if (error) {
        console.error('An error occurred:', error);
      } else {
        rows.forEach(row => {
          const displacementLiters = (row.Displacement / 1000).toFixed(1);
          let aspiration = '';
          switch (row.AspirationTypeId) {
            case 1:
              aspiration = 'NA';
              break;
            case 2:
              aspiration = 'ST';
              break;
            case 3:
              aspiration = 'TT';
              break;
            case 5:
              aspiration = 'SC';
              break;
            case 6:
              aspiration = 'CSC';
              break;
            default:
              aspiration = 'Unknown';
              break;
          }
          const values = [displacementLiters, aspiration, row.Id];
          // myDb.run(insertInfo, values, function (err) {
          //   if (err) {
          //     return console.error(`An error ocurred while updating ${row.Id} from ${database.name}`, err);
          //   }
          //   console.log(`${row.Id} updated succesfully from ${database.name}`);
          // });
        });
      }
    });
  });
  // myDb.all(selectInfo, function (error, rows) {
  //   if (error) {
  //     console.error('An error occurred:', error);
  //   } else {
  //     rows.forEach(row => {
  //       const [engineType] = row.EngineName.split('-');
  //       const values = [engineType.slice(0, -1), row.Id];
  //       myDb.run(insertInfo, values, function (err) {
  //         if (err) {
  //           return console.error(`An error ocurred while updating ${row.Id}`, err);
  //         }
  //         console.log(`${row.Id} updated succesfully`);
  //       });
  //     });
  //   }
  // });
}

module.exports = addDisplacementAndAspirationToCarIndex;