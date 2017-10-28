const Sequelize = require('sequelize');
const sequelize = require('../').sequelize;
const DataTypes = Sequelize.DataTypes;

const Quote = sequelize.define('quote', {
  author_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  guild_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  message_id: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  type: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

module.exports = Quote;
