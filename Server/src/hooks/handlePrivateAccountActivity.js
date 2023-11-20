/* eslint-disable require-atomic-updates */
/**
 * if the profile you are checking is private it will not send any activity
 * @param options
 * @returns {function(*): *}
 */
module.exports =

  function (options = {}) { // eslint-disable-line no-unused-vars
    return async context => {
      const {app, method, params} = context;
      // Check to see if the user is viewing their own page
      // If true, skip everything and return
      // P.S. the first check fails if the server is calling the service and will skip the code
      if (params.user && params.user.id !== params.query.otherUserId) {
        const account = await app.service('users').get(params.query.otherUserId);
        // Should only get 1 result
        const relationship = await app.service('user-relationships').find({
          query: {
            userId: params.user.id,
            otherUserId: params.query.otherUserId,
            type: 'friends'
          }
        });
        // Check to see if the account is private
        // If false, return
        // First check means a friends status was not found
        if (relationship.data.length === 0 && account.private === 1) {
          const privateActivity = {
            id: -1,
            text: 'Account is private',
            otherUserId: null,
            contributionAmount: null,
            userId: -1,
            giftId: null
          };
          if (method === 'find') {
            context.result.data = [privateActivity];
          } else {
            context.result.data = privateActivity;
          }
        }
      }
      return context;
    };
  };
