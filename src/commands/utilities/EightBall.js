const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class EightBall extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['eightball'];
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'utilities';
  }

  /**
   * @returns {string}
   */
  get name() {
    return '8ball';
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
    const number = Math.floor(Math.random() * 20);
    const response = this.bot._(`c.8ball.responses.${number}`);

    return this.execute(msg, this.bot._('c.8ball.answer', {
      response,
    }));
  }
};
