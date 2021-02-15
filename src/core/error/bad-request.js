const HttpError = require('./http-error');

class BadRequestError extends HttpError {
    constructor(message) {
        super(400, message || 'Bad Request', 'BadRequestError');
    }
}

module.exports = BadRequestError
