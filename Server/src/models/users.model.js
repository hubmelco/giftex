// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile_pic: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    googleId: {
      type: DataTypes.STRING
    },

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });


  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.hasMany(models.gifts);
    users.hasMany(models.events);

  };

  return users;
};
