const stripeAPI = require('stripe');
const express = require('@feathersjs/express');

/**
 * Service for receiving stripe requests and handling them accordingly
 * @param app
 */
module.exports = function (app) {
  const stripe = new stripeAPI(app.get('stripe'));
  const endpointSecret = app.get('stripe_endpoint_secret');

  app.post('/stripe', express.raw({type: 'application/json'}), async (request, response) => {
    let event;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      console.log('It makes it in the first if statement');
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        // Creates the event for use in handling the outcome
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log('⚠️  Webhook signature verification failed.', err.message);
        return response.sendStatus(400);
      }
    }

    console.log('TYPE: ', event.type);
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      try {
        // Change the progress for the gift to the new updated amount
        await app.service('gifts').patch(parseInt(event.data.object.metadata.id), {progress: parseFloat(event.data.object.metadata.progress) + parseFloat(event.data.object.amount_total) / 100});
        await app.service('user-activity').create({
          userId: event.data.object.metadata.loggedInUser,
          otherUserId: event.data.object.metadata.userId,
          contributionAmount: (event.data.object.amount_total / 100),
          giftId: event.data.object.metadata.id
        });// Its jons fault, these aren't all the fields
        console.log('successfully created user activity');
      } catch (error) {
        console.log('ERROR: ', error);
      }
    } else {
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
};
