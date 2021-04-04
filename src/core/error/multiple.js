const HttpError = require('./http-error')
const NestedError = require('./nested-error')

class MultiError extends HttpError {
  constructor (message, errors) {
    super(500, message || 'Errors have occured', 'Multi-Error')
    errors = errors.map(err => {
      if (err instanceof Error) {
        return new NestedError(err)
      }
      return err
    })
    this.errorList = errors
  }
}

module.exports = MultiError
