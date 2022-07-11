class AppError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = httpStatus;
  }
}

module.exports = AppError;
