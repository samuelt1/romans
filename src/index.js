const express = require('express')
const bodyParser = require('body-parser')
const serverRoutes = require('./routes')
const config = require('config');
const cors = require('cors')
const logger = require('./core/logger')

const app = express()

configure()
runServer()

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
    });
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
    app.use(cors());
}

module.exports = app
