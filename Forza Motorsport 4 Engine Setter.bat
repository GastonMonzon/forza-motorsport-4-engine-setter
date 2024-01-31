@echo off

REM Display a custom waiting message
echo Waiting for the server and client to start...

REM Start the server
cd server
start /B cmd /k "npm start"

REM Start the client
cd ../client
start /B cmd /k "npm run dev"

REM Open the URL in the default browser
timeout /T 3
start chrome --kiosk --app=http://localhost:5173/