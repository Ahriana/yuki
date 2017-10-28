const Sequelize = require('sequelize');
const sequelize = require('../').sequelize;
const DataTypes = Sequelize.DataTypes;

const Ship = sequelize.define('ship', {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

module.exports = Ship;
