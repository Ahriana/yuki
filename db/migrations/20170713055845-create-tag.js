module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      author_id: {
        type: Sequelize.STRING(20),
      },
      guild_id: {
        type: Sequelize.STRING(20),
      },
      last_used: {
        type: Sequelize.DATE,
      },
      name: {
        type: Sequelize.STRING(2000),
      },
      uses: {
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.STRING(2000),
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
    return queryInterface.dropTable('tags');
  },
};
