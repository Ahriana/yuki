const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Eris = require('eris');

module.exports = class Listen extends BaseCommand {
  constructor(bot) {
    super(bot);

    if (!this.bot['dataManager'].listenStream) {
      this.bot['dataManager'].listenStream(new Eris.SharedStream());
    }
  }

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
    return 'listen';
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
   * @returns {SharedStream}
   */
  get sharedStream() {
    return this.bot['dataManager'].listenStream;
  }

  /**
   * @param {Message} msg
   * @returns {Promise.<void>}
   */
  async process(msg) {
    if (msg.member.voiceState.channelID) {
      const channelID = msg.member.voiceState.channelID;
      const permissions = msg.channel.guild.channels.get(channelID).permissionsOf(this.bot.user.id);

      const connection = this.bot.voiceConnections.get(msg.channel.guild.id);

      if (!permissions.has('voiceConnect')) {
        return this.execute(msg, this.bot._('permission.connect'));
      } else if (connection && connection.channelID === channelID) {
        return this.execute(msg, this.bot._('c.listen.error.already_connected'));
      } else {
        await this.joinChannel(channelID, msg);
      }
    } else {
      return this.execute(msg, this.bot._('c.listen.error.no_channel'));
    }
  }

  /**
   * @param {string} channelID
   * @param {Message} msg
   * @returns {Promise.<Message>}
   */
  async joinChannel(channelID, msg) {
    let connection;

    try {
      connection = await this.bot.joinVoiceChannel(channelID, {
        shared: true,
      });
    } catch (e) {
      this.bot.log.warn('Err connecting to channel', e);

      if (msg) {
        return this.execute(msg, this.bot._('c.listen.error.connect'));
      }
    }

    if (!this.sharedStream.playing) {
      this.sharedStream.play('https://listen.moe/stream');
    }

    this.sharedStream.add(connection);

    connection.on('error', err => {
      this.bot.capture('listen: ', err);
    });

    const channel = this.bot.guilds.get(connection.id).channels.get(connection.channelID);
    let listeners = 0;

    if (channel) {
      listeners = channel.voiceMembers.size;

      if (msg) {
        await this.execute(msg, this.bot._('c.listen.success', {
          channel: channel.name,
        }));
      }
    }

    try {
      await this.bot.redis.setAsync(`voice_connection:${connection.id}`, JSON.stringify({
        channelID: connection.channelID,
        listeners,
      }));
    } catch (e) {
      this.bot.capture('listen: ', e);
    }
  }
};
