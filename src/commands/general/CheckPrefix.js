const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class CheckPrefix extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'general';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'checkprefix';
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
   * @returns {Promise.<void>}
   */
  async process(msg) {
    let prefix;

    try {
      prefix = await this.bot.dataManager.guilds.findOrDefault(msg.channel.guild.id);
    } catch (e) {
      this.bot.capture('checkprefix: ', e);

      prefix = null;
    }

    let content;

    if (prefix && prefix.dataValues.prefix) {
      prefix = prefix.dataValues.prefix;

      content = this.bot._('c.checkprefix.has', {
        prefix,
      });
    } else {
      content = this.bot._('c.checkprefix.none', {
        prefixes: this.bot['messageHandlerOptions']
          .defaultPrefixes
          .map(p => {
            if (p === 'mention') {
              p = `@${this.bot.user.username}#${this.bot.user.discriminator}`;
            }

            return '"`' + p + '`"';
          })
          .join(' '),
      });
    }

    return this.execute(msg, content);
  }
};
