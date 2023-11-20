// Initializes the `stripe` service on path `/stripe`
const { Stripe } = require('./stripe.class');
const hooks = require('./stripe.hooks');

/**
 * this class makes the Stripe service an actual service to be used
 * @param app
 */
module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
    stripeKey: app.get('stripe')
  };

  // Initialize our service with any options it requires
  app.use('/stripe', new Stripe(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('stripe');

  service.hooks(hooks);
};
