const EventEmitter = require('events').EventEmitter;

const server = new EventEmitter();

server.on('request', (request) => {
  console.log({request_1: request});
});

server.on('request', (request) => {
  console.log({request_2: request});
});

server.emit('request', 'Клиент');
server.emit('request', 'Клиент #2');