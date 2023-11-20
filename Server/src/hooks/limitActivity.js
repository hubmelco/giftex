/**
 * This hook is used to limit the number of messages a user may have to 1000
 * Any messages above 1000, will cause the server to delete the oldest message
 */
module.exports = function() {
  return async context => {
    const { data, app } = context;
    app.service('user-activity')
      .find({
        query: {
          userId: data.userId,
          $sort: {createdAt: 0}
        }
      })
      .then((activity) => {
        if (data.length === 1000) {
          app.service('user-activity').remove(activity.data[activity.data.length - 1].id)
            .then()
            .catch();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return context;
  };
};
