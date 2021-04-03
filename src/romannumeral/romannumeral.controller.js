const BadRequest = require('../core/error/bad-request')
const NestedError = require('../core/error/nested-error')
const roman = require('./romannumeral')

function numToRom (req, res, next) {
  try {
    const input = +req.query.query

    // input is a number
    if (isNaN(input)) {
      throw new BadRequest('Please insert a number into the query parameter \'query\'')
    }

    // input is between 1-255
    if (input < 1 || input > 255) {
      throw new BadRequest('Please insert a number between 1-255')
    }

    // call the function
    const output = roman.numToRom(input)

    // return JSON
    res.json({
      input,
      output,
    })
  } catch (error) {
    // If the error is a normal Error, then copy it to a better error
    if (error instanceof Error) { error = new NestedError(error) }
    next(error)
  }
}

module.exports = { numToRom }
