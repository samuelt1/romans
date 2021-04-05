const winston = require('winston')
const config = require('config')

// Uncomment this when actually connected to datadog
// const httpTransportOptions = {
//   host: 'http-intake.logs.datadoghq.com',
//   path: '/v1/input/<APIKEY>?ddsource=nodejs&service=romans',
//   ssl: true,
// }

module.exports = winston.createLogger({
  level: config.get('loglevel'),
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      name: 'consoleLogger',
      colorize: true,
      timestamp: true,
      json: true,
    }),
  // Uncomment this when actually connected to datadog
  // new winston.transports.Http(httpTransportOptions),
  ],
})
