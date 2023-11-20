const app = require('../src/app');

describe('authentication', () => {
  it('registered the authentication service', () => {
    expect(app.service('authentication')).toBeTruthy();
  });

  describe('local strategy', () => {
    const userInfo = {
      email: 'auniqueemail@email.com',
      password: '123',
      name: 'Test',
      dob: Date.now(),
      private: 0
    };

    let createdUser;
    beforeAll(async () => {
      try {
        createdUser = await app.service('users').create(userInfo);
      } catch (error) {
        console.log('Either found an existing user, or had an issue creating the user', error);
      }
    });

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo
      });
      console.log('###################################3');
      console.log(user);
      console.log('###################################3');

      expect(accessToken).toBeTruthy();
      expect(user).toBeTruthy();
      try {
        await app.service('users').remove(createdUser.id);
      } catch(err) {
        // do nothing
      }
    });
  });
});
