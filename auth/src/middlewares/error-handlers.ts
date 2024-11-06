import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log('again? ', err);
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } else {
    console.log('pizza pizza');
    res.status(400).send({
      message: err.message,
    });
  }

  // if (err instanceof DatabaseConnectionError) {
  //   return res.status(500).send({ errors: err.serializeErrors() });
  // }
};
