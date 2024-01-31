const myDb = require('../db.js');
const sqlite3 = require('sqlite3').verbose();

async function getCars(request, response) {
  try {
    myDb.all('SELECT * FROM Car_Index ORDER BY MediaName', (error, allCars) => {
      if (error) {
        return response.status(500).json({ error: error.message });
      }
      response.status(200).json(allCars);
    });
  } catch (error) {
    response.status(404).send({ error, message: 'Error at getting all cars' });
  }
}

module.exports = getCars;
