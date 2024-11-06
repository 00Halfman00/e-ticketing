import { CustomError } from './custom-errors';

export class NotFoundError extends CustomError {
  statusCode = 404;
  message = 'Not found';
  constructor() {
    super('route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'not found' }];
  }
}
