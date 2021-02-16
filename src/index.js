const express = require('express')
const bodyParser = require('body-parser')
const serverRoutes = require('./routes')
const config = require('config')
const cors = require('cors')
const logger = require('./core/logger')

// Uncomment this when actually connected to datadog
// const tracer = require('dd-trace').init({
//     analytics: true,
//     profiling: true,
// })
// connect_datadog = require('connect-datadog')({
//     response_code: true,
//     protocol: true,
//     method: true,
//     tags: [
//         'team:extreme',
//         `name:${config.serverName}`,
//         `env:${process.env.NODE_ENV}`,
//     ]
// });
const app = express()

configure()
runServer()

if (process.env.NODE_ENV == 'prod') {
    process.on('uncaughtException', function (err) {
        logger.fatal(`uncaughtException: '${err.message}'.`, err);
    });
}

function configure() {
    initExpress()
    // Serve up the routes
    app.use(serverRoutes)
    // catch 404 and forward to error handler
    app.use((req, res) => {
        // Send a 404 for anything that does not match a previous route
        res.sendStatus(404)
    })
    app.use((err, req, res, next) => {
        // Handle any errors that got thrown
        res.status(err.statusCode || 500)
        if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'test') {
            // If we are in Dev send the full error to the front
            logger.warn(err)
            res.json(err)
        } else {
            // Dont show the user the error, but still send it to our logger
            logger.warn(err)
            res.send('Well this is embarassing! Something went wrong. Contact support at NotMy@Problem.com')
        }
    })
}

function runServer() {
    // Actually start the thing
    // We set the listener to close it during the tests
    app.listener = app.listen(config.port, () => {
        console.log(`Express server listening on port http://localhost:${config.port}`)
    })
}

function initExpress() {
    // Initialize body parser
    app.use(bodyParser.json({
        limit: '2mb'
    }))
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    // Enable Cors
    app.use(cors())

    // Swagger setup
    const swaggerUi = require('swagger-ui-express')
    const swaggerJSDoc = require('swagger-jsdoc')

    var options = {
        swaggerDefinition: {
            info: {
                title: 'Romans', // Title (required)
                version: '1.0.0' // Version (required)
            },
            host: `localhost:8080`
        },
        apis: [`**/routes.js`] // Path to the API docs
    }

    const swaggerSpec = swaggerJSDoc(options)
    const swaggerdocurl = '/docs'
    app.use(swaggerdocurl, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    // Uncomment this when actually connected to datadog
    // // datadog
    // app.use(connect_datadog)
}

module.exports = app
