const sqlite3 = require('sqlite3');
const myDb = require('../db.js');

async function checkEnginesAlreadySet(request, response) {
  const { car } = request.body;
  try {
    myDb.all(`SELECT * FROM List_UpgradeEngine WHERE EngineID = ${car.EngineID}`, function (error, allSelectedEngineCars) {
      return response.status(200).json(allSelectedEngineCars);
    });
  } catch (error) {
    response.status(404).send({ error, message: 'Error at obtaining engine cars' });
  }
}

module.exports = checkEnginesAlreadySet;
