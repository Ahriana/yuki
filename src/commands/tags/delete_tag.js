const { TagOperation, TagParameter } = require('./enums');
const {
  InvalidTagManagementPermissionError,
  TagParameterNotGivenError,
  UnknownTagError,
} = require('./errors');
const { getTag } = require('./');

/**
 * Deletes a tag in a guild.
 *
 * This performs two checks:
 *
 * - that the command callee is the author of the tag; or
 * - the command callee has the "Manage Server" permission.
 *
 * If both of these fail, the appropriate error message will be returned.
 * Otherwise, the tag will be deleted.
 *
 * This never rejects.
 *
 * @param {TagRequestData} request
 * @returns {Promise.<string>}
 */
async function messageableDeleteTag(request) {
  const name = request.subcommandArgs[0];

  try {
    await deleteTag(request.guild, request.authorID, name);

    return request.chisarok._('c.tag.delete.done', {
      name,
    });
  } catch (e) {
    if (e instanceof InvalidTagManagementPermissionError ||
      e instanceof TagParameterNotGivenError ||
      e instanceof UnknownTagError) {
      return e.toString(request.chisarok);
    } else if (e) {
      return request.chisarok._('c.tag.delete.error.deleting');
    }
  }
}

/**
 * Deletes a tag in a guild by its name.
 *
 * Before calling this function, one of two prerequisites should be checked:
 *
 * @param {string} guild - The guild the tag was created in.
 * @param {string} callerID - The ID of the author of the command.
 * @param {string} name - The name of the tag.
 * @returns {Promise.<void>}
 * @throws {InvalidTagManagementPermissionError}
 * @throws {TagParameterNotGivenError}
 * @throws {UnknownTagError}
 */
async function deleteTag(guild, callerID, name) {
  if (!name) {
    throw new TagParameterNotGivenError(TagParameter.NAME, TagOperation.DELETE);
  }

  const tag = await getTag(guild.id, name);

  const member = guild.members.get(callerID);

  if (tag.author_id !== callerID) {
    if (!member || !member.permission.has('manageGuild')) {
      throw new InvalidTagManagementPermissionError;
    }
  }

  await tag.destroy();
}

module.exports = {
  deleteTag,
  messageableDeleteTag,
};
