import { CustomError } from './custom-errors';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'the connection to database is down';
  constructor(public message: string) {
    super(message);
    // when extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
