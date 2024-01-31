const sqlite3 = require('sqlite3');
const myDb = require('../db.js');

async function checkCarsAlreadySet(request, response) {
  const { car } = request.body;
  try {
    myDb.all(`SELECT * FROM List_UpgradeEngine WHERE Ordinal = ${car.Id}`, function (error, allSelectedCarEngines) {
      return response.status(200).json(allSelectedCarEngines);
    });
  } catch (error) {
    response.status(404).send({ error, message: 'Error at obtaining car engines' });
  }
}

module.exports = checkCarsAlreadySet;
