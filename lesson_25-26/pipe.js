const http = require('http');
const fs = require('fs');

new http.Server((req, res) => {
  if (req.url === '/big.html') {
    const file = new fs.ReadStream('big.html');

    sendFile(file, res);

    // или просто 
    // file.pipe(res);
    return;
  }
  res.end('File Not Found');
}).listen(1337);

function sendFile(file, res) {
  file.on('error', err => {
    res.statusCode = 500;
    res.end('Server Error');
    console.log(err);
  });

  // событие close для сервера это значит что соедиенение было прервано, если оно просто завершилось как положено
  // то будет событие finish
  res.on('close', () => {
    file.destroy();
  });

  file.on('open', () => {
    console.log('open');
  });

  // для файлового потока событие close означает что работа над файло завершена
  file.on('close', () => {
    console.log('close');
  });

  file.on('readable', write);

  function write() {
    const fileContent = file.read(); // считать

    if (fileContent && !res.write(fileContent)) { // отправить
      file.removeListener('readable', write);

      res.once('drain', () => { // при необходимости подождать
        file.on('readable', write);

        write();
      })
    }
  }

  file.on('end', () => {
    res.end();
  });
}