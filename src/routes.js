const express = require('express')
const romanRoutes = require('./romans/routes')
const router = express.Router()

router.use('/romannumeral', romanRoutes)

module.exports = router
