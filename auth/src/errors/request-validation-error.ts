import { ValidationError } from 'express-validator';
import { CustomError } from './custom-errors';

export class RequestValidtionError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('invalid request parameters');

    // when extending a built in class
    Object.setPrototypeOf(this, RequestValidtionError.prototype);
  }

  serializeErrors() {
    return this.errors.map((er) => {
      if (er.type === 'field') {
        return { message: er.msg, field: er.path };
      }
      return { message: er.msg };
    });
  }
}
