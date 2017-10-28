module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('blacklists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      target_id: {
        type: Sequelize.STRING(20),
      },
      type: {
        type: Sequelize.CHAR(1),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('blacklists');
  },
};
