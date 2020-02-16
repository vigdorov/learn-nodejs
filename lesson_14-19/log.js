const winston = require('winston');

function makeLogger(path) {
  const transport = [
    new winston.transports.Console({
      timestamp: true,
      colorize: true,
      level: 'info'
    }),
    new winston.transports.File({
      filename: 'debug.log',
      level: 'debug'
    }),
  ];

  return new winston.createLogger({transports: transport});
}

module.exports = function(module) {
  return makeLogger(module.filename);
};
