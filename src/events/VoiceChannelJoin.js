const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');

module.exports = class VoiceChannelJoin extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'voiceChannelJoin';

    /**
     * @param {Member} member
     * @param {GuildChannel} channel
     * @returns {Promise.<void>}
     */
    this.eventHandler = async (member, channel) => {
      await this.startPlaying(member, channel);
    };
  }

  /**
   * @param {Member} member
   * @param {GuildChannel} channel
   * @returns {Promise.<void>}
   */
  async startPlaying(member, channel) {
    // Must be a voice channel.
    if (channel.type !== 2) {
      return;
    }

    // Ensure we aren't reacting to ourself.
    if (member && member.user.id === this.bot.user.id) {
      return;
    }

    if (!channel.voiceMembers.has(this.bot.user.id)) {
      return;
    }

    await this.bot.redis.setAsync(`voice_connection:${channel.guild.id}`, JSON.stringify({
      channelID: channel.id,
      listeners: channel.voiceMembers.size,
    }));

    // If there's more than one other person in the voice channel, then we're
    // already playing, so don't act on the event.
    if (channel.voiceMembers.size > 2) {
      return;
    }

    const connection = this.bot.voiceConnections.get(channel.guild.id);

    if (!connection) {
      return;
    }

    connection.updateVoiceState(false, false);

    try {
      this.bot.leaveVoiceChannel(channel.id);
    } catch (e) {
    }

    try {
      const newConnection = await this.bot.joinVoiceChannel(channel.id);
      this.bot['commands'].get('listen').sharedStream.add(newConnection);
    } catch (e) {
    }
  }
};
