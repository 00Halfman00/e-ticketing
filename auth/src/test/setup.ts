import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongoDB: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = 'onetwothree';
  mongoDB = await MongoMemoryServer.create();
  const mongoUri = mongoDB.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongoDB) {
    await mongoDB.stop();
  }
  await mongoose.connection.close();
});
