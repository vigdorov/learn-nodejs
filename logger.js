// const log = require('logger')(module);

module.exports = function (module) {
  return function (...args) {
    const msg = [`${module.filename}: `].concat(args)
    console.log(msg);
  }
}