import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'passwords',
    })
    .expect('Content-Type', /json/)
    .expect(201);
});

// this test will trigger an instance of RequestValidationError
it('returns a 400 with invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'oneone.com',
      password: 'passwords',
    })
    .expect(400);
});

// this test will trigger an instance of RequestValidationError
it('returns a 400 with invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'pass',
    })
    .expect(400);
});

// this test will trigger an instance of BadRequestError
it('rerturns 201 and 400, disallowing emails that already exist in database', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'passwords',
    })
    .expect('Content-Type', /json/)
    .expect(201);

  request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'passwords',
    })
    .expect('Content-Type', /json/)
    .expect(400);
});

it('sets cookie after successful sigup', async () => {
  const resp = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'passwords',
    })
    .expect('Content-Type', /json/)
    .expect(201);

  expect(resp.get('Set-Cookie')).toBeDefined();
});
