const Sequelize = require('sequelize');
const sequelize = require('../').sequelize;
const DataTypes = Sequelize.DataTypes;

const Profile = sequelize.define('profile', {
  anime_planet: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  age: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  birthday: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  bio: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  colour: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  icon: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  kitsu: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  location: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  myanimelist: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  osu: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  user_id: {
    allowNull: false,
    type: DataTypes.STRING(20),
  },
});

module.exports = Profile;
