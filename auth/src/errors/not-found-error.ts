import { CustomError } from './custom-errors';

export class NotFoundError extends CustomError {
  statusCode = 404;
  message = 'Not found';
  constructor() {
    super();

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
