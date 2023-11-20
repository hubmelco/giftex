const app = require('../../src/app');

describe('\'amazon\' service', () => {
  it('registered the service', () => {
    const service = app.service('amazon');
    expect(service).toBeTruthy();
  });
});
