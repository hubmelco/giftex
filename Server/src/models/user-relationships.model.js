// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const userRelationships = sequelizeClient.define('user-relationships', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    otherUserId: {
      unique: false,
      type: DataTypes.INTEGER,
    },

    type: DataTypes.STRING,

    userId: {
      unique: false,
      type: DataTypes.INTEGER,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  userRelationships.associate = function (models) {
    //userRelationships.hasMany(models.users);
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return userRelationships;
};
