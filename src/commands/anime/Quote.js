const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Sequelize = require('sequelize');
const { AnimeQuote } = require('../../db/models');

module.exports = class Quote extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'anime';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'quote';
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
   * @returns {Promise.<void|Message>}
   */
  async process(msg) {
    let result;

    try {
      // noinspection JSUnresolvedFunction
      result = await AnimeQuote.findOne({
        order: [
          Sequelize.fn('RANDOM'),
        ],
      });
    } catch (e) {
      this.bot.capture('quote: ', e);

      return this.execute(msg, this.bot._('c.quote.error.retrieval'));
    }

    if (!result) {
      return this.execute(msg, this.bot._('c.quote.no_result'));
    }

    const quote = result.dataValues;

    return this.execute(msg, {
      embed: {
        color: 0xF9C205,
        description: quote.content,
        footer: {
          text: quote.author,
        },
        thumbnail: {
          url: quote.url ? quote.url : undefined,
        },
      },
    });
  }
};
