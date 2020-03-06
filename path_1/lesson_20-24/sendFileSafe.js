const path = require('path');
const fs = require('fs');
const {showError} = require('./showError');

const ROOT = __dirname + '/public/';

function sendFileSafe(filePath, res) {
  try {
    filePath = decodeURIComponent(filePath);
  } catch(e) {
    res.statusCode = 400;
    res.end('Bad Request');
    return;
  }

  if (~filePath.indexOf('\0')) {
    res.statusCode = 400;
    res.end('Bad Request');
    return;
  }

  filePath = path.normalize(path.join(ROOT, filePath));

  if (filePath.indexOf(ROOT) !== 0) {
    res.statusCode = 404;
    res.end('File Not Found');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('File Not Found');
      return;
    }

    sendFile(filePath, res);
  });
}

function sendFile(filePath, res) {
  fs.readFile(filePath, showError((content) => {
    const mime = require('mime').getType(filePath);

    res.setHeader('Content-Type', mime + '; charset=utf-8');
    res.end(content);
  }));
}

module.exports = {
  sendFileSafe,
};