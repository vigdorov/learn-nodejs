const {User} = require('./user');

const vasya = new User('Vasya');
const petya = new User('Petya');

vasya.hello(petya);