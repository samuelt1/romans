const express = require('express')
const romanRoutes = require('./romannumeral/routes')
const router = express.Router()

router.use('/romannumeral', romanRoutes)

module.exports = router
