const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { exec } = require('child_process');

module.exports = class Shell extends BaseCommand {
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
    return 'shell';
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
    exec(args, async (error, stdout, stderr) => {
      let content;

      if (error) {
        content = '```' + error.toString().substring(0, 1994) + '```';
      } else if (stdout) {
        content = '```' + stdout.substring(0, 1994) + '```';
      } else if (stderr) {
        content = '```' + stderr.substring(0, 1994) + '```';
      } else {
        content = this.bot._('c.shell.success');
      }

      return this.execute(msg, content);
    });
  }
};
