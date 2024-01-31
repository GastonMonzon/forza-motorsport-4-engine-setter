const path = require('path');

const { exec } = require('child_process');

async function postDatabases(request, response) {
  try {
    // const { sources } = request.body;
    const { modifiedCars } = request.body;
    const sources = [];
    modifiedCars.forEach(car => {
      if (!sources.includes(car.Source) && car.Source !== 'Main DB') {
        sources.push(car.Source);
      }
    });
    if (sources) {
      sources.map(source => {
        const powerShellCommand = `powershell.exe -ExecutionPolicy Unrestricted -File "${path.join(__dirname, 'script.ps1')}" -folderName "${source}"`;
        exec(powerShellCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error}`);
            return;
          }
          if (stderr) {
            console.error(`PowerShell Error: ${stderr}`);
            return;
          }
          console.log(`PowerShell Output: ${stdout}`);
        });
      });
    }
    response.status(200);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error, message: 'Error at posting databases' });
  }
}

module.exports = postDatabases;