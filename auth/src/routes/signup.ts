import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
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
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('no way');
      throw new BadRequestError('email already exist in database');
    } else {
      const user = User.build(req.body);
      await user.save();

      // GENERATE JSON WEB TOKEN
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      // ASSIGN JSON WEB TOKEN TO req.session
      req.session = {
        jwt: userJwt,
      };
      res.status(201).send(user);
    }
  }
);

export { router as signupRouter };
