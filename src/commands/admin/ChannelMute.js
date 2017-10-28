const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class ChannelMute extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['mutechannel'];
    // noinspection JSUnusedGlobalSymbols
    this.dm = false;
    // noinspection JSUnusedGlobalSymbols
    this.permissions = {
      'manageGuild': true,
    };
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'admin';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'channelmute';
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
   * @param {string} args
   * @returns {Promise.<void|Message>}
   */
  async process(msg, args) {
    const userPermissions = msg.channel.permissionsOf(msg.author.id);

    if (!userPermissions.has('manageChannels')) {
      return this.execute(msg, {
        content: this.bot._('permission.manage_channel'),
      });
    }

    try {
      const muted = await this.set(msg, args);

      const status = muted ? 'muted' : 'unmuted';
      const content = this.bot._(`c.channelmute.${status}`);

      return this.execute(msg, content);
    } catch (e) {
      this.bot.capture('channelmute: ', e);

      this.bot['log'].warn('Err muting channel', e);

      return this.execute(msg, {
        content: this.bot._('c.channelmute.error.update'),
      });
    }
  }

  /**
   * Updates the mute setting of a channel.
   *
   * Returns the new mute status of the channel.
   *
   * @param {Message} msg
   * @param {string} toggle
   * @returns {Promise.<void>|Boolean} Whether the channel is now muted.
   */
  async set(msg, toggle) {
    const guildSetting = await this.bot.dataManager.guilds.findOrDefault(msg.channel.guild.id);

    let mute;

    if (toggle) {
      mute = toggle === 'enabled' || toggle === 'true';
    } else {
      mute = !guildSetting.isChannelMuted(msg.channel.id);
    }

    if (mute) {
      await guildSetting.muteChannel(msg.channel.id);
    } else {
      await guildSetting.unmuteChannel(msg.channel.id);
    }

    await this.bot.dataManager.guilds.save(guildSetting);

    return mute;
  }
};
