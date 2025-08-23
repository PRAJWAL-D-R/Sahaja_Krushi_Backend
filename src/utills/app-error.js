class Apperror extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.explanation = message;
        this.isOperational = true; // Indicates if the error is operational or programming error
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = Apperror;