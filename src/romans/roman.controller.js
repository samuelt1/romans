async function numToRom(req, res, next) {
    try {
        res.send('hi')
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = { numToRom };
