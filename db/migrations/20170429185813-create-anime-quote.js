module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('anime_quotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      author: {
        type: Sequelize.STRING(75),
      },
      content: {
        type: Sequelize.STRING(1750),
      },
      url: {
        type: Sequelize.STRING(250),
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
  down: (queryInterface) => {
    return queryInterface.dropTable('anime_quotes');
  },
};
