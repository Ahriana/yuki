const Sequelize = require('sequelize');
const sequelize = require('../').sequelize;
const DataTypes = Sequelize.DataTypes;

const AnimeQuote = sequelize.define('anime_quote', {
  author: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  url: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});

module.exports = AnimeQuote;
