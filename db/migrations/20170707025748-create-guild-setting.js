module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('guild_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      disabled_commands: {
        type: Sequelize.STRING(2000),
      },
      guild_id: {
        type: Sequelize.STRING(20),
      },
      leave_channel_id: {
        type: Sequelize.STRING(20),
      },
      leave_content: {
        type: Sequelize.STRING(2000),
      },
      muted_channel_ids: {
        type: Sequelize.STRING(2000),
      },
      prefix: {
        type: Sequelize.STRING(1999),
      },
      tableflip_enabled: {
        type: Sequelize.BOOLEAN,
      },
      welcome_channel_id: {
        type: Sequelize.STRING(20),
      },
      welcome_content: {
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
    return queryInterface.dropTable('guild_settings');
  },
};
