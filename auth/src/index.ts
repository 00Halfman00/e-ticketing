import express from 'express';
import { json } from 'body-parser';
const PORT = 3000;

const app = express();

app.use(json());

app.get('/api/users/currentuser', (req, res, next) => {
  res.send('<h1>hello, world</h1>');
});

app.listen(PORT, () => {
  console.log('for testing purposes this line is written');
  console.log(`auth server running on port: ${PORT}  v2.0`);
});
