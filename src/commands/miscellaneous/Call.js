const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Call extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'miscellaneous';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'call';
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
    if (msg.channel.permissionsOf(msg.author.id).has('mentionEveryone')) {
      return this.execute(msg, {
        disableEveryone: false,
        content: this.bot._('c.call.everyone', {
          user: msg.author.username,
        }),
      });
    } else {
      return this.execute(msg, this.bot._('c.call.no_everyone'), {
        user: msg.author.username,
      });
    }
  }
};
