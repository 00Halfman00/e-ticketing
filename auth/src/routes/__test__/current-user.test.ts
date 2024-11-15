import request from 'supertest';
import { app } from '../../app';

it('returns a 201, 200 and 200, verifying the user exist, thrives and has a cooke', async () => {
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
  // this approach won't work cause jest doesn't track cookies well
  // tune in tommorow for a different approach
  // retrive user
  // const resp = await request(app)
  //   .get('/api/users/current-user')
  //   .send()
  //   .expect(200);
  // console.log('resp in get: ', resp);
});
