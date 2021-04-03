const HttpError = require('./http-error')

class FailedMailError extends HttpError {
  constructor (message) {
    super(500, message || 'Bad Request', 'FailedMailError')
  }
}

module.exports = FailedMailError
