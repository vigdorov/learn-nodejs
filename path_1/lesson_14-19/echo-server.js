const http = require('http');
const url = require('url');
const debug = require('debug')('echo-server:request');

const log = require('./log')(module);

const server = new http.Server((req, res) => {
  const urlParsed = url.parse(req.url, true);

  debug({headers: req.headers});
  log.info({headers: req.headers});

  if (urlParsed.pathname === '/echo' && urlParsed.query.message) {
    res.setHeader('Cashe-control', 'no-cash'); // removeHeader - удаляет заголовок
    debugger; // используется для отладки
    debug({message: urlParsed.query.message}) 
    log.debug({message: urlParsed.query.message}) 
    res.end(urlParsed.query.message);
  } else {
    res.statusCode = 404;
    log.error('Page not found');
    res.end('Page not found!');
  }
});

server.listen(1337, 'localhost');