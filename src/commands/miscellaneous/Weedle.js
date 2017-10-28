const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Weedle extends BaseCommand {
  constructor(bot) {
    super(bot);

    // noinspection JSUnusedGlobalSymbols
    this.privateGuilds = ['87601506039132160'];
  }

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
    return 'weedle';
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
    return this.execute(msg, {
      embed: {
        color: 0xD49952,
        description: this.bot._('c.weedle.message'),
        image: {
          url: 'http://i.imgur.com/OTeiAnA.gif',
        },
      },
    });
  }
};
