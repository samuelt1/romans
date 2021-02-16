const express = require('express')
const romanRoutes = require('./romannumeral.controller')
const router = express.Router()


/**
 * @swagger
 * /romannumeral:
 *   get:
 *     description: Convert integer to roman numerals
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: query 
 *         description: The integer to convert
 *         in: query 
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Tthe input and output
 *         schema:
 *           type: object
 *           properties:
 *             input:
 *               type: integer
 *               example: 123
 *             output:
 *               type: string
 *               example: CCXXII
 *       400:
 *         description: Bad request
 *       500:
 *         description: Failed on the server
 */
router.get('/', romanRoutes.numToRom)

module.exports = router
