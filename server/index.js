const server = require('./src/app.js');
const port = process.env.PORT || 3000;

server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
})