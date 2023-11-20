// Initializes the `amazon` service on path `/amazon`
const { Amazon } = require('./amazon.class');
const hooks = require('./amazon.hooks');

module.exports = function (app) {

  // Initialize our service with any options it requires
  app.use('/amazon', new Amazon({}, app));//new Amazon(options, app));
  // Get our initialized service so that we can register hooks
  const service = app.service('amazon');

  service.hooks(hooks);
};
