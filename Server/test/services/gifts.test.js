const app = require('../../src/app');

describe('\'gifts\' service', () => {
  it('registered the service', () => {
    const service = app.service('gifts');
    expect(service).toBeTruthy();
  });
});
