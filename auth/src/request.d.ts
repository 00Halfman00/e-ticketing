import * as express from 'express';

export interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// declare module 'express-serve-static-core' {
//   interface Request {
//     currentUser?: UserPayload;
//   }
// }

// declare namespace Express {
//   interface Request {
//     currentUser?: UserPayload;
//   }
// }
