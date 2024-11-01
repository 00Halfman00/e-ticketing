import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  // if (err instanceof DatabaseConnectionError) {
  //   return res.status(500).send({ errors: err.serializeErrors() });
  // }

  res.status(400).send({
    message: err.message,
  });
};
