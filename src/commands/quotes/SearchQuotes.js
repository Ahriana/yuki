const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Sequelize = require('sequelize');
const { Quote } = require('../../db/models');
const { displayQuote } = require('./');

module.exports = class SearchQuotes extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['rquote', 'squotes'];
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
    return 'searchquotes';
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
    let result;

    if (args) {
      result = await this._findQuote(msg, {
        order: [
          Sequelize.fn('RANDOM'),
        ],
        where: {
          content: {
            ilike: `%${args}%`,
          },
          guild_id: msg.channel.guild.id,
        },
      });
    } else {
      // noinspection JSUnresolvedFunction
      result = await Quote.findOne({
        order: [
          Sequelize.fn('RANDOM'),
        ],
        where: {
          guild_id: msg.channel.guild.id,
        },
      });
    }

    if (!result) {
      return this.execute(msg, this.bot._('c.searchquotes.no_result', {
        search: args,
      }));
    }

    const quote = result.dataValues;

    const author = this.bot.users.get(quote.author_id);

    return this.execute(msg, displayQuote(author, quote.content, quote.type, quote.createdAt, this.bot.chisarok));
  }

  /**
   * Finds a quote given its `where` parameter. Rejects with an undefined value
   * if there was an error.
   *
   * If there is an error querying for a quote, then the error is logged and
   * replies to the message that there was an error.
   *
   * @param {Message} msg - The message received.
   * @param {Object} params - The statement to filter by.
   * @returns {Promise.<Quote>} - Resolves to a possibly found quote. Rejects if
   * there was an error querying for a quote.
   * @private
   */
  async _findQuote(msg, params) {
    try {
      // noinspection JSUnresolvedFunction
      return Quote.findOne(params);
    } catch (e) {
      this.bot['log'].warn(`Error finding quote with arg '${params}'`, e);

      await this.execute(msg, {
        content: `There was an error searching for \`${params}\`.`,
      });

      return Promise.reject();
    }
  }
};
