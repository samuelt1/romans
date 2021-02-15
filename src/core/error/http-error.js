class HttpError {
    constructor(statusCode, message, name) {
        this.stack = (new Error(message)).stack;
        this.name = name ? name : "HttpError";
        this.message = message;
        this.statusCode = statusCode;

    }
}

module.exports = HttpError
