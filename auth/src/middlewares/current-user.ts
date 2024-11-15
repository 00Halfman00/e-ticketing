import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../request';

//// these lines commented out have been moved to a .d.ts file
// interface UserPayload {
//   id: string;
//   email: string;
// }

// declare global {
//   namespace Express {
//     interface Response {
//       currentUser?: UserPayload;
//     }
//   }
// }

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    next();
  } else {
    try {
      const payload = jwt.verify(
        req.session.jwt,
        process.env.JWT_KEY!
      ) as UserPayload;
      req.currentUser = payload;
    } catch (err) {}
    next();
  }
};
