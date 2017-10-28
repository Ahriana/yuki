const { formatGreeting } = require('../../events/index');

/**
 * @typedef {Object} TemporalGuildSettingValues
 * @property {?String} channel_id - The ID of the channel being updated.
 * @property {?String} content - The new content for the setting type.
 */

/**
 *
 * @param {Guild} guild
 * @param {String} channelID
 * @param {Member} member
 * @param {Number} type
 * @param {String} arg
 * @param {GuildManager} guildManager
 * @returns {Promise.<void>|String}
 */
async function updateLeaveOrWelcome(guild, channelID, member, type, arg, guildManager) {
  const guildID = guild.id;

  let guildSetting;

  try {
    guildSetting = await guildManager.findOrDefault(guildID);
  } catch (e) {
    return Promise.reject([[
      'Error retrieving guild setting',
      e,
    ], 'There was an error retrieving the server settings.']);
  }

  if (!guildSetting) {
    return Promise.reject([null, 'No server configuration found.']);
  }

  let enabled = true;

  /**
   * @type {TemporalGuildSettingValues}
   */
  let values;

  if (!arg || arg === 'disable') {
    values = {
      channel_id: null,
      content: null,
    };

    enabled = false;
  } else {
    values = {
      channel_id: channelID,
      content: arg,
    };
  }

  switch (type) {
    case SettingType.LEAVE:
      guildSetting.leave_channel_id = values.channel_id;
      guildSetting.leave_content = values.content;

      break;
    case SettingType.WELCOME:
      guildSetting.welcome_channel_id = values.channel_id;
      guildSetting.welcome_content = values.content;
  }

  try {
    await guildSetting.save();
  } catch (e) {
    return Promise.reject([[
      'Error saving guild settings',
      guildSetting,
      e,
    ], 'There was an error saving the server settings.']);
  }

  const typeName = settingTypeToName(type);

  if (enabled) {
    return `✅ Updated the ${typeName} message and set it to this channel.\n` +
      `An example of your ${typeName} message is:\n\n` +
      `${formatGreeting(arg, guild, member, channelID)}`;
  } else {
    return `✅ Removed the ${typeName} message.`;
  }
}

const SettingType = {
  LEAVE: 0,
  WELCOME: 1,
};

/**
 *
 * @param {Number} type
 * @returns {String}
 */
function settingTypeToName(type) {
  switch (type) {
    case SettingType.LEAVE:
      return 'leave';
    case SettingType.WELCOME:
      return 'welcome';
  }
}

module.exports = {
  SettingType,
  updateLeaveOrWelcome,
};
