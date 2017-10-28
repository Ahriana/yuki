const Sequelize = require('sequelize');
const sequelize = require('../').sequelize;
const DataTypes = Sequelize.DataTypes;

const Blacklist = sequelize.define('blacklist', {
  target_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  type: {
    allowNull: false,
    type: DataTypes.CHAR,
  },
});

module.exports = Blacklist;
