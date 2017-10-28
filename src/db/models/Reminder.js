const Sequelize = require('sequelize');
const sequelize = require('../').sequelize;
const DataTypes = Sequelize.DataTypes;

const AnimeQuote = sequelize.define('reminder', {
  channel_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  reminded_for: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  user_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

module.exports = AnimeQuote;
