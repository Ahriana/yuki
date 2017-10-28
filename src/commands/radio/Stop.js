const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Stop extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'radio';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'stop';
  }

  /**
   * @returns {string}
   */
  get help() {
    const [description, example, usage] = this.bot._m(
      `help.${this.name}.description`,
      `help.${this.name}.examples`,
      `help.${this.name}.usage`,
    );

    return this.bot.helpCreator(this, description, usage, example);
  }

  /**
   * @param {Message} msg
   * @returns {Promise.<void|Message>}
   */
  async process(msg) {
    const member = msg.member;
    const hasManageGuild = member && member.permission.has('manageGuild');

    if (!hasManageGuild) {
      return this.execute(msg, this.bot._('permission.manage_server'));
    }

    const connection = this.bot.voiceConnections.get(msg.channel.guild.id);

    if (!connection || !connection.channelID) {
      return this.execute(msg, this.bot._('c.stop.error.no_channel'));
    }

    const channelID = connection.channelID;

    this.bot.commands.get('listen').sharedStream.remove(connection);
    await this.bot.redis.delAsync(`voice_connection:${connection.id}`, channelID);

    this.bot.leaveVoiceChannel(channelID);

    const channel = msg.channel.guild.channels.get(channelID);
    let content;

    if (channel) {
      content = this.bot._('c.stop.leave.channel', {
        channel: channel.name,
      });
    } else {
      content = this.bot._('c.stop.leave.no_channel');
    }

    return this.execute(msg, content);
  }
};
