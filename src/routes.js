const express = require('express');
const romanRoutes = require('./romans/routes')
const router = express.Router();

router.use('/roman', romanRoutes);

module.exports = router;
