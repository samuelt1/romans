class HttpError {
  constructor (statusCode, message, name, stack) {
    this.stack = stack || (new Error(message)).stack
    this.name = name || 'HttpError'
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = HttpError
