const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Pick extends BaseCommand {
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
    return 'pick';
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
    let choices = args.split('|');

    choices = choices.filter(c => c.trim() !== '');

    if (choices.length < 2) {
      return this.execute(msg, {
        content: this.bot._('c.pick.choice_amount'),
      });
    }

    const choice = choices[Math.floor(Math.random() * (choices.length))].trim();

    return this.execute(msg, this.bot._('c.pick.chosen', {
      choice,
    }));
  }
};
