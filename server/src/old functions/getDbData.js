const sqlite3 = require('sqlite3');

export default function getDbData() {
  const db = new sqlite3.Database('../../carsDb.db');
  const carData = [];
  const carTable = db.all('SELECT * FROM Car_Index', function (error, rows) {
    rows.forEach(row => {
      carData.push(row);
    });
  });
  return carTable;
}