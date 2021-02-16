const winston = require('winston')
const config = require('config')

const logger = module.exports = winston.createLogger({
    level: config.loglevel,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            name: "consoleLogger",
            colorize: true,
            timestamp: true
        }),
        new splunk({
            format: combine(
                winston.format((info) => {
                    info.appName = "Romans";
                    info.src = source;
                    return info;
                })(),
                timestamp(),
                prettyPrint()
            ),
            token: config.splunktoken,
            url: config.splunkurl + guid(),
            level: config.splunkloglevel,
        })
    ],
})

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // tslint:disable-next-line
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16);
    });
}
