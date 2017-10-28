module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reminders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      channel_id: {
        type: Sequelize.STRING(20),
      },
      content: {
        type: Sequelize.STRING(2000),
      },
      reminded_for: {
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.STRING(20),
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
    return queryInterface.dropTable('reminders');
  },
};
