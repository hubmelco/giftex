// Initializes the `userRelationships` service on path `/user-relationships`
const { UserRelationships } = require('./user-relationships.class');
const createModel = require('../../models/user-relationships.model');
const hooks = require('./user-relationships.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['patch', 'remove']
  };

  // Initialize our service with any options it requires
  app.use('/user-relationships', new UserRelationships(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-relationships');

  service.hooks(hooks);
};
