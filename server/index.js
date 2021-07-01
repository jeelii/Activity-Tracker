const app = require('./app');
const http = require('http');

const port = 9000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Hello! Server is now running on port ${port}.`);
});
