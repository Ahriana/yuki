const Sequelize = require('sequelize');
const config = require('../../db/options');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = {
  sequelize,
};
