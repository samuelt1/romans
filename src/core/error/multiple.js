const HttpError = require('./http-error')

class MultiError extends HttpError {
  constructor (message, ...errors) {
    super(500, message || 'Errors have occured', 'Multi-Error')
    this.errorList = errors
  }
}

module.exports = MultiError
