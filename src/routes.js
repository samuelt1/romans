const express = require('express')
const romanRoutes = require('./romannumeral/routes')
const postCallRoutes = require('./postCall/routes')
const router = express.Router()

router.use('/romannumeral', romanRoutes)
router.use('/postCall', postCallRoutes)

module.exports = router
