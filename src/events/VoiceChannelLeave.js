const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');

module.exports = class VoiceChannelLeave extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'voiceChannelLeave';

    /**
     * @param {Member} member
     * @param {GuildChannel} channel
     * @returns {Promise.<void>}
     */
    this.eventHandler = async (member, channel) => {
      await this.stopPlaying(member, channel);
    };
  }

  /**
   * @param {Member} member
   * @param {GuildChannel} channel
   * @returns {Promise.<void>}
   */
  async stopPlaying(member, channel) {
    if (channel.type !== 2) {
      return;
    }

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

    if (channel.voiceMembers.size !== 1) {
      return;
    }

    const connection = this.bot.voiceConnections.get(channel.guild.id);

    if (!connection) {
      return;
    }

    connection.pause();
    this.bot['commands'].get('listen').sharedStream.remove(connection);

    connection.updateVoiceState(true, false);

    // So here's a neat little story about the heat death of the universe:
    //
    // Imagine that you're playing games with your friends, listening to weeb
    // music through a radio.
    //
    // You and your friends are done playing, so you leave the voice channel.
    // But next time you play a game you want the weeb music to still be
    // there; you don't want to make it join again.
    //
    // It would be neat if it stayed there.
    //
    // It's still there, like you want it to be.
    //
    // But when you get there its indicator is green still. And it always will
    // be because the client has a bug that causes it to not change from green
    // if it stops sending audio, even when muting.
    //
    // And it stays green. Forever. And ever.
    //
    // Until the heat death of the universe.
    //
    // So what the bot does is leave and quickly rejoin the voice channel. Half
    // the time you don't even see a flicker that it left. And then all is well
    // in the universe.
    //
    //
    // For posterity, here is the code that fixes this issue:
    //
    // ```js
    // if (connection.channelID) {
    //   this.bot.leaveVoiceChannel(connection.channelID)
    //
    //   await this.bot.joinVoiceChannel(connection.channelID)
    // }
    // ```
    //
    //
    //
    //
    // Also, I just realized while typing this that it _doesn't matter_ if the
    // green indicator stays there. No one's in the voice channel anyway, so no
    // one can see it. If someone joins, it starts playing music again anyway.
    // What's the point of this reconnecting thing to make it not green?
  }
};
