import request from 'supertest';
import { app } from '../../app';

it('returns a 201 and a 200 when user exist and signsout', async () => {
  // create user
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'passwords',
    })
    .expect('Content-Type', /json/)
    .expect(201);

  // signout user
  const resp = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);
  const cookie = resp.get('Set-Cookie');

  if (!cookie) {
    throw new Error('Expected cookie but go undefined');
  }
  expect(cookie[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
