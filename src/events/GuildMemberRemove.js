const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { formatGreeting } = require('.');
const { SettingType, updateLeaveOrWelcome } = require('../commands/admin');

module.exports = class GuildMemberRemove extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'guildMemberRemove';

    /**
     * @param {Guild} guild
     * @param {Member} member
     * @returns {Promise.<void>}
     */
    this.eventHandler = async (guild, member) => {
      /**
       * @type {GuildSetting}
       */
      let guildSetting;

      try {
        guildSetting = await this.bot.dataManager.guilds.findOrDefault(guild.id);
      } catch (e) {
        this.bot.capture('guildmemberremove: ', e);

        return;
      }

      if (!guildSetting) {
        return;
      }

      if (!guildSetting.leave_channel_id || !guildSetting.leave_content) {
        return;
      }

      const channelID = guildSetting.leave_channel_id;

      if (!guild.channels.has(channelID)) {
        updateLeaveOrWelcome(guild, channelID, member, SettingType.LEAVE, null, this.bot.dataManager.guilds);

        return;
      }

      const leaveContent = guildSetting.leave_content;
      const content = formatGreeting(leaveContent, guild, member, channelID);

      try {
        await this.bot.createMessage(channelID, content);
      } catch (e) {
      }
    };
  }
};
