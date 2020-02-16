const fs = require('fs');

const stream = new fs.ReadStream('text.txt', {encoding: 'utf-8'});

stream.on('readable', () => {
  const data = stream.read();
  console.log(data);
});

stream.on('end', () => {
  console.log('THE END');
});

stream.on('error', err => {
  console.log(err);
});
