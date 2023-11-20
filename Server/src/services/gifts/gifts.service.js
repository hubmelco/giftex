// Initializes the `gifts` service on path `/gifts`
const { Gifts } = require('./gifts.class');
const createModel = require('../../models/gifts.model');
const hooks = require('./gifts.hooks');

/**
 * makes the gifts service an actual service
 * @param app
 */
module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gifts', new Gifts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gifts');

  service.hooks(hooks);
};
