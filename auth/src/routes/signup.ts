import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidtionError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be a vaild email address'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('password must be 8-20 characters long'),
  ],
  (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      throw new RequestValidtionError(error.array());
    }
    const { email, password } = req.body;
    throw new DatabaseConnectionError();
  }
);

export { router as signupRouter };
