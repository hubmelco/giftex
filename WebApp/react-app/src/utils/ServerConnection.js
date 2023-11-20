import io from 'socket.io-client';

const feathers = require('@feathersjs/client');

// Socket.io is exposed as the `io` global.
const socket = io('http://sdlstudentvm06.msoe.edu:3001');
// @feathersjs/client is exposed as the `feathers` global.

export const app = feathers()
    .configure(feathers.socketio(socket, {timeout: 15000}))
    .configure(feathers.authentication({
        storage: window.localStorage
    }));

export const usersService = app.service('users');
export const eventsService = app.service('events');
export const giftsService = app.service('gifts');
export const userRelationshipsService = app.service('user-relationships');
export const stripeService = app.service('stripe');
export const activityService = app.service('user-activity');
export const notifyService = app.service('notifications');