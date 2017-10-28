const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Restart extends BaseCommand {
  constructor(bot) {
    super(bot);

    // noinspection JSUnusedGlobalSymbols
    this.ownerOnly = true;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'owner';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'restart';
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
    await this.execute(msg, this.bot._('c.restart.success'));
    this.bot.disconnect();

    await new Promise(resolve => setTimeout(resolve, 1000));
    this.bot['log'].warn('Restarted Bot');
    process.exit(0);
  }
};
