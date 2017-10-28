const { QuoteType } = require('./enums');

/**
 * Determines the "name" of the quote in string form.
 *
 * @param {QuoteType} type - The type to determine the name of.
 * @param {Chisarok} chisarok
 * @returns {String} The name of the type.
 */
function quoteTypeName(type, chisarok) {
  switch (type) {
    case QuoteType.TEXT:
      return chisarok._('c.userquote.text');
    case QuoteType.VOICE:
      return chisarok._('c.userquote.voice');
  }
}

/**
 * Returns a colour representing a specific webhook type, for use as an embed's
 * colour.
 *
 * @param {number} type
 * @returns {number}
 */
function webhookColour(type) {
  switch (type) {
    case WebhookStatus.SUCCESS:
      return 0x43b581;
    case WebhookStatus.WARN:
      return 0xfaa61a;
    case WebhookStatus.ERROR:
      return 0xf04747;
    case WebhookStatus.INFO:
      return 0x11479e;
  }
}

const WebhookStatus = {
  SUCCESS: 1,
  WARN: 2,
  ERROR: 3,
  INFO: 4,
};

/**
 * Normalizes input into an output that will not trigger markdown parsing on
 * Discord's end.
 *
 * The following markdown is normalized:
 *
 * - ** (bold)
 * - * (italic)
 * - _ (italic)
 * - ~~ (strikethrough)
 * - ` ([inline] codeblock)
 * - __ (underscore)
 *
 * @example
 * // convert "**hello**" to "\*\*hello\*\*"
 * normalizeTest('**hello**'); // "\*\*hello\*\*"
 *
 * @param {string} input
 * @returns {string}
 */
function normalizeText(input) {
  return input
    .replace('*', '\\*')
    .replace('_', '\\_')
    .replace('~~', '\\~\\~')
    .replace('`', '\\`');
}

/**
 * Counts the number of times a given substring occurs in a given string.
 *
 * @example
 * substrInstances('hello', 'l') // 2
 *
 * @param {string} string - The string to search instances in.
 * @param {string} substring - The string to count the number of instances of.
 * @returns {number} The number of times `substring` occurred in `string`.
 */
function substrInstances(string, substring) {
  return string.split(substring).length - 1;
}

/**
 * @param {BaseCommand | string} command
 * @param {string} description
 * @param {string} usage
 * @param {string} examples
 * @returns {string}
 */
function helpCreator(command, description, usage, examples) {
  let message = '**';

  if (typeof command === 'string') {
    message += command;
  } else {
    message += command.name;
  }

  message += '**:\n';
  message += description;

  if (examples) {
    message += '\n\n**Examples**:\n';
    message += examples;
  }

  message += '\n\n**Usage**:\n';
  message += usage;

  if (command.aliases && command.aliases.length > 0) {
    message += '\n\n**Aliases**:\n';
    message += command.aliases.map(a => '`' + a + '`').join(', ');
  }

  return message;
}

module.exports = {
  WebhookStatus,
  helpCreator,
  normalizeText,
  substrInstances,
  quoteTypeName,
  webhookColour,
};
