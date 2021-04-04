const HttpError = require('./http-error')

class NestedError extends HttpError {
  constructor (error, message) {
    super(500, message || error.message || 'An error has occured', error.name || 'Nested-Error', error.stack)
  }
}

module.exports = NestedError
