const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');

module.exports = class VoiceChannelSwitch extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'voiceChannelSwitch';

    /**
     * @param {Member} member
     * @param {GuildChannel} newChannel
     * @param {GuildChannel} oldChannel
     * @returns {Promise.<void>}
     */
    this.eventHandler = async (member, newChannel, oldChannel) => {
      if (oldChannel.voiceMembers.has(this.bot.user.id)) {
        await this.bot['events']['voiceChannelLeave'].stopPlaying(null, oldChannel);
      } else if (newChannel.voiceMembers.has(this.bot.user.id)) {
        await this.bot['events']['voiceChannelJoin'].startPlaying(null, newChannel);
      }
    };
  }
};
