import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
const PORT = 3000;

import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

const initDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  } catch (err) {
    console.error(err);
  }
  app.listen(PORT, () => {
    console.log('for testing purposes this line is written');
    console.log(`auth server running on port: ${PORT}  v3.0`);
  });
};

initDB();
