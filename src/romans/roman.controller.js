async function numToRom(req, res, next) {
    try {
        console.log(req.params.number)
        res.send('hi')
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = { numToRom };
