'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('anime_quotes', 'author', {
        allowNull: false,
        type: Sequelize.STRING(75),
      }),
      queryInterface.changeColumn('anime_quotes', 'content', {
        allowNull: false,
        type: Sequelize.STRING(1750),
      }),
      queryInterface.changeColumn('anime_quotes', 'url', {
        allowNull: true,
        type: Sequelize.STRING(250),
      }),
      queryInterface.changeColumn('images', 'type', {
        allowNull: false,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('images', 'url', {
        allowNull: false,
        type: Sequelize.STRING(50),
      }),
      queryInterface.changeColumn('puns', 'content', {
        allowNull: false,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('quotes', 'author_id', {
        allowNull: false,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('quotes', 'content', {
        allowNull: false,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('quotes', 'guild_id', {
        allowNull: false,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('quotes', 'message_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('quotes', 'type', {
        allowNull: false,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('guild_settings', 'disabled_commands', {
        allowNull: false,
        defaultValue: [],
        type: Sequelize.ARRAY(Sequelize.STRING(100)),
      }),
      queryInterface.changeColumn('guild_settings', 'guild_id', {
        allowNull: false,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('guild_settings', 'leave_channel_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('guild_settings', 'leave_content', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('guild_settings', 'muted_channel_ids', {
        allowNull: false,
        defaultValue: [],
        type: Sequelize.ARRAY(Sequelize.STRING(20)),
      }),
      queryInterface.changeColumn('guild_settings', 'prefix', {
        allowNull: true,
        type: Sequelize.STRING(1999),
      }),
      queryInterface.changeColumn('guild_settings', 'tableflip_enabled', {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.changeColumn('guild_settings', 'welcome_channel_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('guild_settings', 'welcome_content', {
        allowNull: true,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('ships', 'name', {
        allowNull: false,
        type: Sequelize.STRING(25),
      }),
      queryInterface.changeColumn('ships', 'url', {
        allowNull: false,
        type: Sequelize.STRING(175),
      }),
      queryInterface.changeColumn('blacklists', 'target_id', {
        allowNull: false,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('blacklists', 'type', {
        allowNull: false,
        type: Sequelize.CHAR(1),
      }),
      queryInterface.changeColumn('tags', 'author_id', {
        allowNull: false,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('tags', 'guild_id', {
        allowNull: false,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('tags', 'last_used', {
        allowNull: true,
        type: Sequelize.DATE,
      }),
      queryInterface.changeColumn('tags', 'name', {
        allowNull: false,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('tags', 'uses', {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('tags', 'value', {
        allowNull: false,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('reminders', 'channel_id', {
        allowNull: false,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('reminders', 'content', {
        allowNull: false,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('reminders', 'reminded_for', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.changeColumn('reminders', 'user_id', {
        allowNull: false,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('profiles', 'anime_planet', {
        allowNull: true,
        type: Sequelize.STRING(32),
      }),
      queryInterface.changeColumn('profiles', 'age', {
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('profiles', 'birthday', {
        allowNull: true,
        type: Sequelize.DATE,
      }),
      queryInterface.changeColumn('profiles', 'bio', {
        allowNull: true,
        type: Sequelize.STRING(1024),
      }),
      queryInterface.changeColumn('profiles', 'colour', {
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('profiles', 'icon', {
        allowNull: true,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('profiles', 'kitsu', {
        allowNull: true,
        type: Sequelize.STRING(32),
      }),
      queryInterface.changeColumn('profiles', 'location', {
        allowNull: true,
        type: Sequelize.STRING(2),
      }),
      queryInterface.changeColumn('profiles', 'myanimelist', {
        allowNull: true,
        type: Sequelize.STRING(32),
      }),
      queryInterface.changeColumn('profiles', 'name', {
        allowNull: true,
        type: Sequelize.STRING(32),
      }),
      queryInterface.changeColumn('profiles', 'osu', {
        allowNull: true,
        type: Sequelize.STRING(32),
      }),
      queryInterface.changeColumn('profiles', 'status', {
        allowNull: true,
        type: Sequelize.STRING(64),
      }),
      queryInterface.changeColumn('profiles', 'user_id', {
        allowNull: false,
        type: Sequelize.STRING(20),
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('anime_quotes', 'author', {
        allowNull: true,
        type: Sequelize.STRING(75),
      }),
      queryInterface.changeColumn('anime_quotes', 'content', {
        allowNull: true,
        type: Sequelize.STRING(1750),
      }),
      queryInterface.changeColumn('anime_quotes', 'url', {
        allowNull: true,
        type: Sequelize.STRING(250),
      }),
      queryInterface.changeColumn('images', 'type', {
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('images', 'url', {
        allowNull: true,
        type: Sequelize.STRING(50),
      }),
      queryInterface.changeColumn('puns', 'content', {
        allowNull: true,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('quotes', 'author_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('quotes', 'content', {
        allowNull: true,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('quotes', 'guild_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('quotes', 'message_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('quotes', 'type', {
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('guild_settings', 'disabled_commands', {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING(100)),
      }),
      queryInterface.changeColumn('guild_settings', 'guild_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('guild_settings', 'leave_channel_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('guild_settings', 'leave_content', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('guild_settings', 'muted_channel_ids', {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.STRING(20)),
      }),
      queryInterface.changeColumn('guild_settings', 'prefix', {
        allowNull: true,
        type: Sequelize.STRING(1999),
      }),
      queryInterface.changeColumn('guild_settings', 'tableflip_enabled', {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.changeColumn('guild_settings', 'welcome_channel_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('guild_settings', 'welcome_content', {
        allowNull: true,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('ships', 'name', {
        allowNull: true,
        type: Sequelize.STRING(25),
      }),
      queryInterface.changeColumn('ships', 'url', {
        allowNull: true,
        type: Sequelize.STRING(175),
      }),
      queryInterface.changeColumn('blacklists', 'target_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('blacklists', 'type', {
        allowNull: true,
        type: Sequelize.CHAR(1),
      }),
      queryInterface.changeColumn('tags', 'author_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('tags', 'guild_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('tags', 'last_used', {
        allowNull: true,
        type: Sequelize.DATE,
      }),
      queryInterface.changeColumn('tags', 'name', {
        allowNull: true,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('tags', 'uses', {
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('tags', 'value', {
        allowNull: true,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('reminders', 'channel_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('reminders', 'content', {
        allowNull: true,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('reminders', 'reminded_for', {
        allowNull: true,
        type: Sequelize.DATE,
      }),
      queryInterface.changeColumn('reminders', 'user_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
      queryInterface.changeColumn('profiles', 'anime_planet', {
        allowNull: true,
        type: Sequelize.STRING(32),
      }),
      queryInterface.changeColumn('profiles', 'age', {
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('profiles', 'birthday', {
        allowNull: true,
        type: Sequelize.DATE,
      }),
      queryInterface.changeColumn('profiles', 'bio', {
        allowNull: true,
        type: Sequelize.STRING(1024),
      }),
      queryInterface.changeColumn('profiles', 'colour', {
        allowNull: true,
        type: Sequelize.INTEGER,
      }),
      queryInterface.changeColumn('profiles', 'icon', {
        allowNull: true,
        type: Sequelize.STRING(2000),
      }),
      queryInterface.changeColumn('profiles', 'kitsu', {
        allowNull: true,
        type: Sequelize.STRING(32),
      }),
      queryInterface.changeColumn('profiles', 'location', {
        allowNull: true,
        type: Sequelize.STRING(2),
      }),
      queryInterface.changeColumn('profiles', 'myanimelist', {
        allowNull: true,
        type: Sequelize.STRING(32),
      }),
      queryInterface.changeColumn('profiles', 'name', {
        allowNull: true,
        type: Sequelize.STRING(32),
      }),
      queryInterface.changeColumn('profiles', 'osu', {
        allowNull: true,
        type: Sequelize.STRING(32),
      }),
      queryInterface.changeColumn('profiles', 'status', {
        allowNull: true,
        type: Sequelize.STRING(64),
      }),
      queryInterface.changeColumn('profiles', 'user_id', {
        allowNull: true,
        type: Sequelize.STRING(20),
      }),
    ]);
  },
};
