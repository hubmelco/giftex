const app = require('../../src/app');

describe('\'userRelationships\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-relationships');
    expect(service).toBeTruthy();
  });
});
