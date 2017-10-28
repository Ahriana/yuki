const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { QuoteType } = require('../../enums');
const { saveQuote } = require('./');

module.exports = class VoiceQuote extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['vquote'];
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'quotes';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'voicequote';
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
      return this.execute(msg, this.bot._('c.userquote.no_quote'));
    }

    await saveQuote(msg, QuoteType.VOICE, args, this);
  }
};
