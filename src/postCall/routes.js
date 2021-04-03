const express = require('express')
const postCallRoutes = require('./postCall.controller')
const router = express.Router()

/**
 * @swagger
 * /postCall:
 */
router.post('/', postCallRoutes.postCall)

module.exports = router
