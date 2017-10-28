const { Tag } = require('../../db/models');
const { UnknownTagError } = require('./errors');

/**
 * Retrieves a tag by the ID of the guild it's in and its name.
 *
 * @param {string} guildID - The ID of the guild to retrieve a tag from.
 * @param {string} name - The name of the tag to retrieve.
 * @returns {Promise.<Tag>} - The found tag.
 * @throws {UnknownTagError} When the specified tag doesn't exist.
 */
async function getTag(guildID, name) {
  // noinspection JSUnresolvedFunction
  const result = await Tag.findOne({
    where: {
      guild_id: guildID,
      name,
    },
  });

  if (!result) {
    throw new UnknownTagError(name);
  }

  return result;
}

/**
 * A simple temporal container for all of the information that tag commands may
 * need to access to perform processing.
 *
 * @prop {string} guild
 * @prop {string} authorID
 * @prop {string[]} subcommandArgs
 * @prop {Map<string, User>} users
 * @prop {Chisarok} chisarok
 */
class TagRequestData {
  /**
   * @param {Guild} guild
   * @param {string} authorID
   * @param {string[]} subcommandArgs
   * @param {Map<string, User>} users
   * @param {Chisarok} chisarok
   */
  constructor(guild, authorID, subcommandArgs, users, chisarok) {
    /**
     * @type {string}
     */
    this.guild = guild;
    /**
     * @type {string}
     */
    this.authorID = authorID;
    /**
     * @type {string[]}
     */
    this.subcommandArgs = subcommandArgs;
    /**
     * @type {Map<string, User>}
     */
    this.users = users;
    /**
     * @type {Chisarok}
     */
    this.chisarok = chisarok;
  }
}

module.exports = {
  TagRequestData,
  getTag,
};
