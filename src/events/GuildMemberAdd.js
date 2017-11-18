const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { formatGreeting } = require('.');
const { SettingType, updateLeaveOrWelcome } = require('../commands/admin');

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

      try {
        if (guildSetting.welcome_content === 'image') {
          this._image(guild, member, channelID);
        } else {
          this._text(guildSetting, guild, member, channelID);
        }
      } catch (e) {
        this.bot.capture(e);
      }
    };
  }

  /**
   *
   * @param {Guild} guild The guild a message is being sent in.
   * @param {Member} member The member that just joined the guild.
   * @param {string} channelID The ID of the channel to send a message.
   */
  async _image(guild, member, channelID) {
    const [ImageType, ImageGenerationRequest] = [this.bot.imageService.ImageType, this.bot.imageService.ImageGenerationRequest];

    let req = new ImageGenerationRequest;
    req.set_type(ImageType.WELCOME);
    req.set_member_name(member.user.username);
    req.set_guild_name(guild.name);
    req.set_members(guild.memberCount);

    const resp = await this.bot.generateImage(req);

    try {
      await this.bot.createMessage(channelID, {}, {
        file: resp.data,
        name: 'welcome.png',
      });
    } catch (e) {
    }
  }

  /**
   * Sends a welcome message in text form in the given guild and channel for the
   * given member.
   *
   * @param {GuildSetting} guildSetting The settings of the guild to send a
   * welcome message.
   * @param {Guild} guild The guild a message is being sent in.
   * @param {Member} member The member that just joined the guild.
   * @param {string} channelID The ID of the channel to send a message.
   */
  async _text(guildSetting, guild, member, channelID) {
    const welcomeContent = guildSetting.welcome_content;
    const content = formatGreeting(welcomeContent, guild, member, channelID);

    try {
      await this.bot.createMessage(channelID, content);
    } catch (e) {
    }
  }
};
