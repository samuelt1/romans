class HttpError extends Error {
    constructor(statusCode, message, name) {
        super()
        this.name = name ? name : "HttpError";
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = HttpError
