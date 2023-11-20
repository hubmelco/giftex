// Initializes the `user-activity` service on path `/user-activity`
const { UserActivity } = require('./user-activity.class');
const createModel = require('../../models/user-activity.model');
const hooks = require('./user-activity.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: {
      'default': 50,
      'max': 50
    }
  };

  // Initialize our service with any options it requires
  app.use('/user-activity', new UserActivity(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-activity');

  service.hooks(hooks);
};
