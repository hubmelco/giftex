const limitActivity = require('../../hooks/limitActivity');
const handlePrivateAccountActivity = require('../../hooks/handlePrivateAccountActivity');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [limitActivity()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [handlePrivateAccountActivity()],
    get: [handlePrivateAccountActivity()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
