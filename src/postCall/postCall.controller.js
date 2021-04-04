const NestedError = require('../core/error/nested-error')
const handleCall = require('./handleCall')

async function postCall (req, res, next) {
  try {
    // call the function
    await handleCall.handleCall(req.body)

    // return JSON
    res.sendStatus(201)
  } catch (error) {
    // If the error is a normal Error, then copy it to a better error
    // eslint-disable-next-line no-ex-assign
    if (error instanceof Error) { error = new NestedError(error) }
    next(error)
  }
}

module.exports = { postCall }
