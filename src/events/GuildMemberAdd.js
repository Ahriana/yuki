const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { formatGreeting } = require('./index');
const { SettingType, updateLeaveOrWelcome } = require('../commands/admin/index');

module.exports = class GuildMemberAdd extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'guildMemberAdd';

    this.eventHandler = async (guild, member) => {
      /**
       * @type {GuildSetting}
       */
      let guildSetting;

      try {
        guildSetting = await this.bot.dataManager.guilds.findOrDefault(guild.id);
      } catch (e) {
        this.bot.capture('guildmemberadd: ', e);

        return;
      }

      if (!guildSetting) {
        return;
      }

      if (!guildSetting.welcome_channel_id || !guildSetting.welcome_content) {
        return;
      }

      const channelID = guildSetting.welcome_channel_id;

      if (!guild.channels.has(channelID)) {
        updateLeaveOrWelcome(guild, channelID, member, SettingType.WELCOME, null, this.bot.dataManager.guilds);

        return;
      }

      const welcomeContent = guildSetting.welcome_content;
      const content = formatGreeting(welcomeContent, guild, member, channelID);

      try {
        await this.bot.createMessage(channelID, content);
      } catch (e) {
      }
    };
  }
};
