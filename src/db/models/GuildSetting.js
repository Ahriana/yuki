const Sequelize = require('sequelize');
const sequelize = require('../').sequelize;
const DataTypes = Sequelize.DataTypes;

const GuildSetting = sequelize.define('guild_setting', {
  disabled_commands: {
    allowNull: false,
    defaultValue: [],
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  guild_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  leave_channel_id: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  leave_content: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  muted_channel_ids: {
    allowNull: false,
    defaultValue: [],
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  prefix: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  tableflip_enabled: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
  welcome_channel_id: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  welcome_content: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});

/**
 * Checks if a channel is muted, returning a boolean on whether it is.
 *
 * @param {string} channelID - The ID of the channel to check.
 * @returns {boolean} Whether the channel is muted.
 */
GuildSetting.prototype.isChannelMuted = function (channelID) {
  return this.muted_channel_ids.includes(channelID);
};

GuildSetting.prototype.muteChannel = async function (channelID) {
  if (!this.muted_channel_ids.includes(channelID)) {
    this.muted_channel_ids = this.muted_channel_ids.concat([channelID]);
  }
};

GuildSetting.prototype.unmuteChannel = async function (channelID) {
  if (this.muted_channel_ids.includes(channelID)) {
    this.muted_channel_ids = this.muted_channel_ids.filter(x => x !== channelID);
  }
};

/**
 * Checks if a command is disabled, returning a boolean on whether it is.
 *
 * @param {string} cmdName - The name of the command to check.
 * @returns {boolean} Whether the command is disabled.
 */
GuildSetting.prototype.isCommandDisabled = function (cmdName) {
  return this.disabled_commands.includes(cmdName);
};

GuildSetting.prototype.disableCommand = async function (cmdName) {
  if (!this.disabled_commands.includes(cmdName)) {
    this.disabled_commands = this.disabled_commands.concat([cmdName]);
  }
};

GuildSetting.prototype.enableCommand = async function (cmdName) {
  if (this.disabled_commands.includes(cmdName)) {
    this.disabled_commands = this.disabled_commands.filter(x => x !== cmdName);
  }
};

module.exports = GuildSetting;
