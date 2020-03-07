const winston = require('winston');
const ENV = process.env.NODE_ENV;

const getLogger = incomingModule => {
    const path = incomingModule.filename.split('/').slice(-2).join('/');

    return new winston.createLogger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: (ENV === 'development') ? 'debug' : 'error',
                label: path,
            }),
        ],
    });
};

module.exports = getLogger;
