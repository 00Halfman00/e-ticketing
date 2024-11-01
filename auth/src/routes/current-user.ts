import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
  res.send('<h1>hello</h1>');
});

export { router as currentUserRouter };
