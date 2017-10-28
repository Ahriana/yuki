const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class LetsPlay extends BaseCommand {
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
    return 'letsplay';
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
    const input = args || 'a game';

    if (msg.channel.permissionsOf(msg.author.id).has('mentionEveryone')) {
      return this.execute(msg, {
        disableEveryone: false,
        content: this.bot._('c.letsplay.everyone', {
          game: input,
          user: msg.author.username,
        }),
      });
    } else {
      return this.execute(msg, this.bot._('c.letsplay.no_everyone', {
        game: input,
        user: msg.author.username,
      }));
    }
  }
};
