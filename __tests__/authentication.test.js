'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../source/server');
const mockRequest = supergoose(server);
process.env.SECRET = 'bananas';

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' }, //YWRtaW46cGFzc3dvcmQ=
  worker: { username: 'worker', password: 'password', role: 'worker' }, //ZWRpdG9yOnBhc3N3b3Jk
  user: { username: 'user', password: 'password', role: 'user' }, //dXNlcjpwYXNzd29yZA==
};

describe('Authentication Routes', () => {

  Object.keys(users).forEach(userType => {

    describe(`${userType} users`, () => {

      it('can sign up a new user and return the token to the client', async () => {
        const response = await mockRequest.post('/signup').send(users[userType]);
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username);
      });

      it('Should not sign up an invalid user (existing username)', async () => {
        const response = await mockRequest.post('/signup').send(users[userType]);
        expect(response.status).toEqual(404);
      });

      it('can signin with basic', async () => {
        const response = await mockRequest.post('/signin')
          .auth(users[userType].username, users[userType].password);
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.token).toBeDefined();
        expect(userObject.user._id).toBeDefined();
        expect(userObject.user.username).toEqual(users[userType].username);

      });
      it('Should not sign in an invalid user', async () => {
        let response = await mockRequest.post('/signin').auth('foo', 'bars');
        expect((response.statusCode)).toEqual(403);
        //TODO: Figure out how to consume the error here. 
      });
    });
  });
});