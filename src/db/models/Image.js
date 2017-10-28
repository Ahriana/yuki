const Sequelize = require('sequelize');
const sequelize = require('../').sequelize;
const DataTypes = Sequelize.DataTypes;

const Image = sequelize.define('image', {
  type: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

module.exports = Image;
