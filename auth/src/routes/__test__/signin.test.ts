import request from 'supertest';
import { app } from '../../app';

// right syntax and right credentials
describe('POST /api/users/signin', () => {
  it('returns 201 and 200 upon successful signup and signin ', async () => {
    // signup
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'one@one.com',
        password: 'passwords',
      })
      .expect('Content-Type', /json/)
      .expect(201);
    // singin
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'one@one.com',
        password: 'passwords',
      })
      .expect('Content-Type', /json/)
      .expect(200);
  });

  // this test will trigger an instance of RequestValidationError...
  it('returns 400 with invalid email', async () => {
    // invalid email syntax
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'oneone.com',
        password: 'passwords',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  // this test will trigger an instance of RequestValidationError
  it('returns 400 with invalid password', async () => {
    // invalid password length
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'one@one.com',
        password: 'passwo',
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });
});

// this test will trigger an instance of BadRequest Error
it('returns 400 with invalid user', async () => {
  // user is not signedup, first
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'two@two.com',
      password: 'passwords',
    })
    .expect('Content-Type', /json/)
    .expect(400);
});

// user exist but password is wrong
// this test will trigger an instance of BadRequest Error
it('returns 201 and 400 upon successful signup and failed signin password', async () => {
  // signup
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'passwords',
    })
    .expect('Content-Type', /json/)
    .expect(201);

  // invalid password
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'one@one.com',
      password: 'passWords',
    })
    .expect('Content-Type', /json/)
    .expect(400);
});

it('checks that the signed in user has a cookie', async () => {
  // signup
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'passwords',
    })
    .expect('Content-Type', /json/)
    .expect(201);
  // signin
  const resp = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'one@one.com',
      password: 'passwords',
    })
    .expect('Content-Type', /json/)
    .expect(200);
  // check for cookie
  expect(resp.get('Set-Cookie')).toBeDefined();
});
