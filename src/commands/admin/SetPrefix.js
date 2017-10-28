const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class SetPrefix extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['changeprefix'];
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
    return 'setprefix';
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
   * @returns {Promise.<void>}
   */
  async process(msg, args) {
    try {
      const isSet = await this.set(msg, args);
      const content = SetPrefix.actionContent(isSet, args);

      return this.execute(msg, content);
    } catch (e) {
      this.bot.capture('setprefix: ', e);

      return this.execute(msg, {
        content: this.bot._('c.setprefix.error.update'),
      });
    }
  }

  /**
   * Returns a formatted string describing the current state of a guild's custom
   * prefix.
   *
   * @param {boolean} exists - Whether a custom prefix is currently in use by a
   * guild.
   * @param {string} prefix - The prefix in use.
   * @returns {string} The formatted string.
   */
  static actionContent(exists, prefix) {
    if (exists) {
      return `The custom prefix has been set to **${prefix}**.`;
    } else {
      return `The custom prefix has been removed.`;
    }
  }

  /**
   * @param {Message} msg
   * @param {string} newPrefix
   * @returns {Promise.<boolean>}
   */
  async set(msg, newPrefix) {
    const guildSetting = await this.bot.dataManager.guilds.findOrDefault(msg.channel.guild.id);
    const matchedPrefix = newPrefix ? newPrefix.match(/"(.*?)"/) : null;

    if (newPrefix) {
      if (matchedPrefix) {
        newPrefix = matchedPrefix[1];
      }

      guildSetting.prefix = newPrefix;
    } else {
      guildSetting.prefix = null;
    }

    await this.bot.dataManager.guilds.save(guildSetting);

    return Boolean(newPrefix);
  }
};
