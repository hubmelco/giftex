// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const gifts = sequelizeClient.define('gifts', {
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
    },
    // Might be scrapped if we make categories a table
    category: {
      type: DataTypes.STRING(20),
    },
    deadline: {
      type: DataTypes.DATEONLY(),
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    // Adding extra attributes
    progress: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    thumbnail: {
      type: DataTypes.STRING
    },
    receiverId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    receiverName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    eventId: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  gifts.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    gifts.belongsTo(models.users, {foreignKey: {allowNull: false}});
    gifts.belongsToMany(models.events, {through: 'event-gifts'});

  };

  return gifts;
};
