import mongoose from 'mongoose';
const PORT = 3000;
import { app } from './app';

const init = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  } catch (err) {
    console.error(err);
  }
  console.log('auth-mongo-srv running on port: 27017');
  app.listen(PORT, () => {
    console.log(`auth server running on port: ${PORT}`);
  });
};

init();
