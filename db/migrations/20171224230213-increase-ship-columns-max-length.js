'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('ships', 'name', {
        allowNull: true,
        type: Sequelize.STRING(50),
      }),
      queryInterface.changeColumn('ships', 'url', {
        allowNull: true,
        type: Sequelize.STRING(500),
      }),
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('ships', 'name', {
        allowNull: true,
        type: Sequelize.STRING(25),
      }),
      queryInterface.changeColumn('ships', 'url', {
        allowNull: true,
        type: Sequelize.STRING(175),
      }),
    ]);
  }
};
