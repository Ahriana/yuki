const { Quote } = require('../../db/models');
const { QuoteType } = require('../../enums');
const { quoteTypeName } = require('../../utils');

/**
 * An object representing the textual embed view for a quote.
 *
 * @typedef {Object} DisplayedQuote
 * @property {DisplayedQuoteEmbed} embed - A container for displaying
 * information about the quote in a fancy way.
 */

/**
 * An object containing the embed information for a displayed quote.
 *
 * @typedef {Object} DisplayedQuoteEmbed
 * @property {DisplayedQuoteAuthor} author - Information about the person who
 * made the quote.
 * @property {Number} color - The colour-coded representation of the embed,
 * dependant on the type of quote.
 * @property {String} description - The content of the quote.
 * @property {DisplayedQuoteFooter} footer - A minimal text representation
 * containing the type of quote.
 * @property {Date} timestamp - The timestamp to use for the embed. This should
 * be the time that the quote was made.
 */

/**
 * An object representing the name and avatar of the user who made a quote.
 *
 * @typedef {Object} DisplayedQuoteAuthor
 * @property {?String} icon_url - The URL to the user's icon, if they have one.
 * @property {String} name - The username of the author.
 */

/**
 * An object representing the footer of the quote embed, which simply states the
 * type of quote.
 *
 * @typedef {Object} DisplayedQuoteFooter
 * @property {String} text - A short snippet describing the type of quote.
 */

/**
 * Saves a quote to the database and quotes channel, by type.
 *
 * @example
 * // saves a text quote
 * _saveQuote(msg, QuoteType.TEXT, this.bot);
 *
 * @arg {Message} msg - The message that was received to respond to. Used to
 * respond to and check channel info from.
 * @arg {QuoteType} type - The type of quote being made.
 * @arg {BaseCommand} classInstance - The instance of the bot, containing guild
 * and channel info which is needed for permission checking.
 * @returns {Promise.<void>} A promise which resolves to void on a successful
 * response (not necessarily a successful quote saving), or rejects on some
 * error.
 */
async function saveQuote(msg, type, content, classInstance) {
  const quoteChannel = msg.channel.guild.channels.find(c => c.name === 'quotes');

  if (!quoteChannel) {
    return classInstance.execute(msg, classInstance.bot._('c.userquote.error.no_channel'));
  }

  const permissions = quoteChannel.permissionsOf(classInstance.bot.user.id);

  if (!permissions.has('sendMessages')) {
    try {
      await classInstance.execute(msg, classInstance.bot._('c.userquote.error.permission', {
        mention: quoteChannel.mention,
      }));
    } catch (e) {
      classInstance.bot.log.warn('Error posting no-quote-permission msg', e);
    }

    return;
  }

  let sent;

  try {
    const displayedQuote = displayQuote(msg.author, content, type, Date.now(), classInstance.bot);

    sent = await classInstance.bot.createMessage(quoteChannel.id, displayedQuote);
  } catch (e) {
    await classInstance.execute(msg, classInstance.bot._('c.userquote.error.posting'));

    return;
  }

  try {
    // noinspection JSUnresolvedFunction
    Quote.create({
      author_id: msg.author.id,
      guild_id: msg.channel.guild.id,
      message_id: sent.id,
      content,
      type,
    });
  } catch (e) {
    classInstance.bot.log.warn('Error saving quote', e);
  }

  // Notify the user that the quote has been added by responding with an :ok:,
  // but only if we have permission to.
  if (permissions.has('addReactions')) {
    try {
      // :ok: reaction if this doesn't render.
      await msg.addReaction('✅');
    } catch (e) {
      classInstance.bot.log.warn('Err adding quote reaction', e);
    }
  }
}

/**
 * Returns an object containing embed information for displaying a textual
 * representation of the quote.
 *
 * @param {User} quoteAuthor - The information of the author of the quote.
 * @param {String} content - The quote content itself.
 * @param {QuoteType} type - The type of quote this is.
 * @param {string | number} createdAt - The quote creation date
 * @param {Chisarok} chisarok
 * @returns {DisplayedQuote}
 */
function displayQuote(quoteAuthor, content, type, createdAt, chisarok) {
  const typeName = quoteTypeName(type, chisarok);
  const quoteColour = getQuoteColour(type);

  return {
    embed: {
      author: {
        name: quoteAuthor.username,
        icon_url: quoteAuthor.avatarURL,
      },
      color: quoteColour,
      description: content,
      footer: {
        text: chisarok._('c.userquote.footer', {
          type: typeName,
        }),
      },
      timestamp: new Date(createdAt),
    },
  };
}

/**
 * Returns the text or voice colour representation for use with embeds.
 *
 * Text quotes return 0xed9f5c, while voice quotes return `0xc779f2`.
 *
 * @param {QuoteType} type - The quote type to determine a colour for.
 * @returns {number} The colour for use in an embed.
 */
function getQuoteColour(type) {
  switch (type) {
    case QuoteType.TEXT:
      return 0xed9f5c;
    case QuoteType.VOICE:
      return 0xc779f2;
  }
}

module.exports = {
  displayQuote,
  getQuoteColour,
  saveQuote,
};
