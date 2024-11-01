import express from 'express';
import { json } from 'body-parser';
const PORT = 3000;

import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.get('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('for testing purposes this line is written');
  console.log(`auth server running on port: ${PORT}  v3.0`);
});
