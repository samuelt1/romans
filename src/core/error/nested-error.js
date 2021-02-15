const HttpError = require('./http-error');

class NestedError extends HttpError {
    constructor(error) {
        super(500, error.message || 'An error has occured', error.name || 'Nested-Error', error.stack);
    }
}

module.exports = NestedError
