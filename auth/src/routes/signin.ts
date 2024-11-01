import express, { Request, Response } from 'express';
import { query } from 'express-validator';
const router = express.Router();

router.post('/api/users/signin', (req: Request, res: Response) => {
  const { name, password } = req.body;
});

export { router as signinRouter };
