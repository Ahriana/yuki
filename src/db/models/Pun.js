const Sequelize = require('sequelize');
const sequelize = require('../').sequelize;
const DataTypes = Sequelize.DataTypes;

const Pun = sequelize.define('pun', {
  content: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

module.exports = Pun;
