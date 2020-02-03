// module.exports = exports = this
const {User} = require('./user');
const db = require('./db');
const log = require('./logger')(module);

function run() {
  const vasya = new User('Vasya');
  const petya = new User('Petya');

  vasya.hello(petya);
  log(db.getPhrases('Run successful'));
}

if (module.parent) {
  exports.run = run;
} else {
  run();
}