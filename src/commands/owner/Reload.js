const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Reload extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['r'];
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
    return 'reload';
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
    try {
      await this.bot.reloadCommands(`${__dirname}/../../commands/`);
    } catch (e) {
      this.bot.log.warn('Error reloading commands', e);

      return this.execute(msg, this.bot._('c.reload.error.commands'));
    }

    try {
      await this.bot.reloadEvents(`${__dirname}/../../events/`);
    } catch (e) {
      this.bot.log.warn('Error reloading events', e);

      return this.execute(msg, this.bot._('c.reload.error.events'));
    }

    return this.execute(msg, this.bot._('c.reload.success'));
  }
};
