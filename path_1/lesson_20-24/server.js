const http = require('http');
const fs = require('fs');
const url = require('url');
const {sendFileSafe} = require('./sendFileSafe');

const server = http.createServer((req, res) => {
  if (!checkAccess(req)) {
    res.status = 403;
    res.end('Tell me a correct secret');
    return;
  }

  sendFileSafe(url.parse(req.url).pathname, res);
});

function checkAccess(req) {
  return url.parse(req.url, true).query.secret === 'pow';
}

server.listen(1337);

// setTimeout(() => {
//   server.close();
// }, 3000);

setInterval(() => {
  // console.log(process.memoryUsage());
}, 2000).unref(); // unref() для таймера говорит что он не обязательный, и его работа не заблокирует закрытие сервера
// такой метод unref есть и других асинхронных операций