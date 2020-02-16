const http = require('http');
const fs = require('fs');
const chat = require('./chat');

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');

  switch (req.url) {
    case '/subscribe': {
      chat.subscribe(req, res);
      break;
    }
    case '/publish': {
      let data = '';
      req
        .on('readable', () => {
          data += req.read() || '';
          if (data.length > 1e4) {
            res.statusCode = 413;
            res.end('Your message is too long for my little chat');
          }
        })
        .on('end', () => {
          try {
            data = JSON.parse(data);
          } catch(e) {
            res.statusCode = 400;
            res.end('Bad request');
            console.log(e);
            return;
          }
          chat.publish(data.message);
          res.end();
        });
      break;
    }
    default: {
      res.statusCode = 404;
      res.end('Not Found');
    }
  }
}).listen(1337);