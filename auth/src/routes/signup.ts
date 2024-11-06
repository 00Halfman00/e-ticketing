import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidtionError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

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
  async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      throw new RequestValidtionError(error.array());
    } else {
      const { email } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new BadRequestError('email already exist in database');
      } else {
        const user = User.build(req.body);
        await user.save();
        const userJwt = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_KEY!
        );
        req.session = {
          jwt: userJwt,
        };

        res.status(201).send(user);
      }
    }
  }
);

export { router as signupRouter };
