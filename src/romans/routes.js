const express = require('express');
const romanRoutes = require('./roman.controller')
const router = express.Router();

router.get('/', romanRoutes.numToRom);

module.exports = router;
