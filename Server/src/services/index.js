const users = require('./users/users.service.js');
const gifts = require('./gifts/gifts.service.js');
const events = require('./events/events.service.js');
const amazon = require('./amazon/amazon.service.js');
const userRelationships = require('./user-relationships/user-relationships.service.js');
const stripe = require('./stripe/stripe.service.js');
const stripeWebhook = require('../stripeWebhook');
const userActivity = require('./user-activity/user-activity.service.js');
const notifications = require('./notifications/notifications.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(gifts);
  app.configure(events);
  app.configure(amazon);
  app.configure(userRelationships);
  app.configure(stripe);
  app.configure(stripeWebhook);
  app.configure(userActivity);
  app.configure(notifications);
};
