const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Dice = require('dice-expression-evaluator');

module.exports = class Roll extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['dice'];
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
    return 'roll';
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
    const input = args || 'd6';

    let dice;

    try {
      dice = new Dice(input);
    } catch (e) {
      return this.execute(msg, this.bot._('c.roll.bad_input'));
    }

    if (dice.dice.find(d => d.diceCount > 100)) {
      return this.execute(msg, this.bot._('c.roll.max_count'));
    } else if (dice.dice.find(d => d.sideCount > 100)) {
      return this.execute(msg, this.bot._('c.roll.max_sides'));
    }

    return this.execute(msg, this.bot._('c.roll.rolled', {
      result: dice(),
    }));
  }
};
