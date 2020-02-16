const fs = require('fs');
const {showError} = require('./showError');

fs.writeFile('text.txt', 'data2', showError(() => {
  fs.rename('text.txt', 'text_2.txt', showError);
}));