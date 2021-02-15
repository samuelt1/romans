const BadRequest = require('../core/error/bad-request')
async function numToRom(req, res, next) {
    try {
        // Error handing
        throw new BadRequest('no number')
        console.log(req.params.number)
        res.send('hi')
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = { numToRom };
