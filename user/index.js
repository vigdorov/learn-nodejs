const phrases = require('./ru');

class User {
  constructor(name) {
    this.name = name;
  }

  hello(who) {
    console.log(`${phrases.Hello}, ${who.name}`);
  }
}

module.exports = {
  User
};