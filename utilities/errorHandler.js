class ErrorHandler extends Error {
  constructor() {
    super();
  }
  create(message, statusText, statusCode) {
    this.statusCode = statusCode;
    this.message = message;
    this.statusText = statusText;
    return this;
  }
}
export const errorHandler = new ErrorHandler();
