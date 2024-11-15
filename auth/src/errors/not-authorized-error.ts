import { CustomError } from './custom-errors';

export class NotAuthorizedError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'not authorized' }];
  }
}
