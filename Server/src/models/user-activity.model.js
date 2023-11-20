// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const userActivity = sequelizeClient.define('user-activity', {
    otherUserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contributionAmount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  userActivity.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    userActivity.belongsTo(models.users);
    userActivity.belongsTo(models.gifts);
  };

  return userActivity;
};
