const { TagOperation, TagParameter } = require('./enums');
const { TagParameterNotGivenError, UnknownTagError } = require('./errors');
const { getTag } = require('./');

/**
 * Edits a tag, returning a string representation of the success/error response.
 *
 * There is one requirement:
 * - the author of the command editing the tag _must_ be the author of the tag.
 *
 * This never rejects.
 *
 * @param {TagRequestData} request
 * @returns {Promise.<string>} The resultant string describing the success/error
 * value.
 */
async function messageableEditTag(request) {
  try {
    return editTag(request.guild.id, request.authorID, request.subcommandArgs, request.chisarok);
  } catch (e) {
    if (e instanceof TagParameterNotGivenError || e instanceof UnknownTagError) {
      return e.toString(request.chisarok);
    } else {
      return request.chisarok._('c.edit.error.editing');
    }
  }
}

/**
 *
 * @param {string} guildID - The ID of the guild the command was performed in.
 * @param {string} authorID - The ID of the author of the command.
 * @param {Array.<string>} args - An array of subcommand arguments, where the
 * first value is the name and remaining values can be joined together to form a
 * value.
 * @param {Chisarok} chisarok - The bot's instance of Chisarok.
 * @returns {Promise.<string>}
 * @throws {TagParameterNotGivenError}
 * @throws {UnknownTagError}
 */
async function editTag(guildID, authorID, args, chisarok) {
  const [name, ...values] = args;

  if (!name) {
    throw new TagParameterNotGivenError(TagParameter.NAME, TagOperation.EDIT);
  } else if (values.length === 0) {
    throw new TagParameterNotGivenError(TagParameter.VALUE, TagOperation.EDIT);
  }

  let tag = await getTag(guildID, name);

  // The person editing the tag _must_ be the author of the tag.
  //
  // Even admins should not be allowed to do this.
  if (tag.author_id !== authorID) {
    return chisarok._('c.tag.edit.error.not_owner');
  }

  tag.value = values.join(' ');

  await tag.save();

  return chisarok._('c.tag.edit.done');
}

module.exports = {
  editTag,
  messageableEditTag,
};
