module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('quotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      author_id: {
        type: Sequelize.STRING(20),
      },
      content: {
        type: Sequelize.STRING(2000),
      },
      guild_id: {
        type: Sequelize.STRING(20),
      },
      message_id: {
        type: Sequelize.STRING(20),
      },
      type: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('quotes');
  },
};
