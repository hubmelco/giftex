/**
 * This hook is used to give users a default image
 * @param options
 * @returns {function(*): *}
 */
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { data, app } = context;

    // Update the original data (so that people can't submit additional stuff)
    context.data = {
      ...data,
      //http://localhost:3001/images/defaultPicture.png
      profile_pic: `http://${app.get('host')}:${app.get('port')}/images/defaultPicture.png`
    };

    return context;
  };
};
