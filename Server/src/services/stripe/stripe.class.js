/* eslint-disable no-unused-vars,indent */

const StripeAPI = require('stripe');

/**
 * this class is a custom service for the Stripe API which it connects to
 * defines the functionality of the stripe service
 * @type {exports.Stripe}
 */
exports.Stripe = class Stripe {
  constructor(options) {
    this.options = options || {};
    if (!options.stripeKey) {
      throw new Error('StripeAPI key must be provided!');
    }
    this.stripe = new StripeAPI(options.stripeKey);
  }

  //This is needed so the app.post in stripeWebhook works DONT DELETE
  async create () {

  }

  async get(data, params) {
    try {
      // Creates a session, basically what redirects the user to the stripe payment page, and will give an event
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        submit_type: 'donate',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: data.productData,
              unit_amount: data.unitAmount,
            },
            quantity: 1,
          },
        ],
        metadata: {...data.giftData, loggedInUser: params.user.id},
        mode: 'payment',
        success_url: 'http://sdlstudentvm06.msoe.edu/gifts/' + data.giftData.id,
        cancel_url: 'http://sdlstudentvm06.msoe.edu/gifts/' + data.giftData.id,
      });
      return session.url;
    } catch (e) {
      return e;
    }
  }
};
