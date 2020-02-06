const http = require('http');

const server = new http.Server();

server.listen(1337, '127.0.0.1');

server.on('request', (req, res) => {
  res.end('Привет мир!');
});