const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const MathJS = require('mathjs');

module.exports = class Calculate extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['calc'];
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
    return 'calculate';
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
    if (!args) {
      return this.execute(msg, this.bot._('c.calculate.no_argument'));
    }

    let result;

    try {
      // noinspection JSUnresolvedFunction
      result = MathJS.eval(args);
    } catch (e) {
      result = e;
    }

    return this.execute(msg, '```xl\n' + result + '```');
  }
};
