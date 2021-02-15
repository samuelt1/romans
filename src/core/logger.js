const winston = require('winston');
const config = require('config');

const logger = module.exports = winston.createLogger({
    level: config.loglevel,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            name: "consoleLogger",
            colorize: true,
            timestamp: true
        }),
    ],
});
