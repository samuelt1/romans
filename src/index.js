const express = require('express')
const bodyParser = require('body-parser')
const serverRoutes = require('./routes')
const winston = require('winston')
const pjson = require('../package.json')
const config = require('config');
const nodemon = require('nodemon')

const app = express()
configure()
runServer()

function configure() {
    initExpress()
    app.use(express.static(__dirname + '/private'))
    app.use(serverRoutes)
    // catch 404 and forward to error handler
    app.use((req, res) => {
        res.sendStatus(404)
    })
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        if (process.env.NODE_ENV == 'dev') {
            err.stack
            res.json(err)
        } else {
            winston.error(err)
            res.send('Well this is embarassing! Something went wrong. Contact support at NotMy@Problem.com')
        }
    })
}

function runServer() {
    app.listen(config.port, () => {
        console.log(`Express server listening on port http://localhost:${config.port}`)
    });
}

function initExpress() {
    app.use(bodyParser.json({
        limit: '2mb'
    }))
    app.use(bodyParser.urlencoded({
        extended: true
    }))
}
