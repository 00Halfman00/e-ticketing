import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidtionError } from '../errors/request-validation-error';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new RequestValidtionError(error.array());
  } else {
    next();
  }
};
