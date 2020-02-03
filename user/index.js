const db = require('../db');
const log = require('../logger')(module);

db.connect();

class User {
  constructor(name) {
    this.name = name;
  }

  hello(who) {
    log(`${db.getPhrases('Hello')}, ${who.name}`);
  }
}

exports.User = User;