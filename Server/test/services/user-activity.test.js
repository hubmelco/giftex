const app = require('../../src/app');

describe('\'user-activity\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-activity');
    expect(service).toBeTruthy();
  });
});
