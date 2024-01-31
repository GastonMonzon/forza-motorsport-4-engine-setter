const japanCars = `SELECT Data_Car.MediaName, Data_Car.Id, Data_Car.MakeID, Data_Car.CountryID, Data_Engine.EngineID FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName WHERE Data_Car.CountryID = 5`;

const japanEngines = `SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 229
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 149
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 199
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 576
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 148
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 298
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 327
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 551
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 487
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 98
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 215
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 115
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 457
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 180
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 195
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 505
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 329
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 99
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 178
UNION
SELECT Data_Car.MediaName, Data_Car.Id, Data_Engine.EngineID, Data_Car.MakeID, Data_Engine.EngineName
FROM Data_Car JOIN Data_Engine ON Data_Car.MediaName = Data_Engine.MediaName 
WHERE Data_Engine.EngineID = 227`;

const insertJapanEngines = `INSERT INTO List_UpgradeEngine (Id, Ordinal, Level, EngineID, IsStock, ManufacturerID, Price, MassDiff,  WeightDistDiff, DragScale, WindInstabilityScale) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

function addJapanEngines(databases, dbOg) {
  databases.forEach((database) => {
    database.data.all(japanCars, function (error, cars) {
      if (error) {
        console.error('An error occurred:', error);
      } else {
        cars.forEach((car) => {
          dbOg.all(japanEngines, function (erro, engines) {
            engines.forEach((engine, i) => {
              const isInstalled = database.data.all(`SELECT * FROM List_UpgradeEngine WHERE Ordinal = ${car.Id} AND EngineID = ${engine.EngineID}`);
              if (isInstalled.length === 0) {
                const values = [car.Id * 1000 + i + 5, car.Id, 1, engine.EngineID, 0, engine.MakeID, 10000, 20.0, 0.0, 1.0, 1.0];
                // database.data.run(insertJapanEngines, values, function (err) {
                //   if (err) {
                //     return console.error(`An error ocurred while updating ${engine.EngineName} to ${car.MediaName} for ${database.name}`, err);
                //   }
                //   console.log(`${engine.EngineName} to ${car.MediaName} added succesfully for ${database.name}`);
                // });
              }
            })
          })
        })
      }
    })
  })
}

module.exports = addJapanEngines;
