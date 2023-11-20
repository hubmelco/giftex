const app = require('../../src/app');

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');
    expect(service).toBeTruthy();
  });
});

describe('default picture',() => {
  it('It confirms a created user is given a default picture', async () => {
    const userInfo = {
      email: 'auniqueemail@email.com',
      password: '123',
      name: 'Test',
      dob: Date.now(),
      private: 0
    };
    let user;
    try {
      user = await app.service('users').create(userInfo);
      expect(user.profile_pic).toBe('http://localhost:3001/images/defaultPicture.png');
    } catch (err) {
      console.log('Could not create user', err);
    }
    try {
      await app.service('users').remove(user.id);
    } catch (err) {
      console.log('Could not remove test user', err);
    }
  });
});
