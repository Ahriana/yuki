const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Lenny extends BaseCommand {
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
    return 'lenny';
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
    let content;

    switch (args) {
      case 'sneaky':
        content = '┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴';

        break;
      case 'nose':
        content = '(͡ ͡° ͜ つ ͡͡°)';

        break;
      case 'sad':
        content = '( ͡° ʖ̯ ͡°)';

        break;
      case 'old':
        content = '( º¿_º)';

        break;
      default:
        content = '( ͡° ͜ʖ ͡°)';

        break;
    }

    return this.execute(msg, content);
  }
};
