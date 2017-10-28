const { Tag } = require('../../db/models');
const { TagOperation, TagParameter } = require('./enums');
const { TagAlreadyExistsError, TagParameterNotGivenError } = require('./errors');

/**
 * Creates a tag, returning a string representation of the success/error
 * response.
 *
 * This never rejects.
 *
 * @param {TagRequestData} request
 * @returns {Promise.<string>}
 */
async function messageableCreateTag(request) {
  try {
    /**
     * Destructures index 0 of the array into a variable named `name`, and
     * the remaining values of the array into an array named `values`.
     *
     * This is equivalent to doing:
     *
     * ```js
     * const name = request.subcommandArgs[0]
     * const values = request.subcommandArgs.splice(1)
     * ```
     */
    const [name, ...values] = request.subcommandArgs;

    // Create the tag. If this succeeds, we can ignore the return value, since
    // we only need the name which we already have.
    await createTag(request.guild.id, request.authorID, name, values.join(' '));

    return request.chisarok._('c.tag.create.done', {
      name,
    });
  } catch (e) {
    /**
     * Custom errors in Yuki have `toString` implementations that provide
     * meaningful messages to the user.
     *
     * Other errors are verbose technical details which the user doesn't need
     * to know.
     *
     * To handle this, check if the error is one of our own, and call its
     * `toString` implementation. Otherwise, just give a generic error message.
     */
    if (e instanceof TagAlreadyExistsError || e instanceof TagParameterNotGivenError) {
      return e.toString(request.chisarok);
    } else if (e) {
      return request.chisarok._('c.tag.create.error.creating');
    }
  }
}

/**
 * Creates a tag for a guild.
 *
 * There are 2 restrictions on this:
 *
 * - a name should not have spaces
 * - the value must be non-empty
 *
 * @param {string} guildID - The ID of the guild that the tag is being created
 * in.
 * @param {string} authorID - The ID of the user creating the tag.
 * @param {string} name - The name of the tag.
 * @param {string} value - The value of the tag.
 * of the tag, and the succeeding elements being the content, which whill be
 * joined.
 * @returns {Promise.<string>}
 * @throws {TagAlreadyExistsError} When a tag with the name in the guild
 * already exists.
 * @throws {TagParameterNotGivenError} When a name or value was not given.
 */
async function createTag(guildID, authorID, name, value) {
  // If the name is empty or the number of values is 0, then throw an error for
  // the appropraite tag parameter.
  //
  // The number of values must be greater than 0 to ensure there is tag content.
  if (!name) {
    throw new TagParameterNotGivenError(TagParameter.NAME, TagOperation.CREATE);
  } else if (!value) {
    throw new TagParameterNotGivenError(TagParameter.VALUE, TagOperation.CREATE);
  }

  /*
   * Find the tag if it already exists by `guild_id` and `name`.
   *
   * If the tag doesn't exist, create it and return it.
   *
   * When making this tag, the number of uses must be `0` and the `last_used`
   * value must be `null`, since it hasn't been used before.
   */
  /**
   * This will return 2 values: the resultant tag (which we don't actually care
   * about), and whether a tag already existed or whether it was newly created
   * (inserted).
   */
  // noinspection JSUnresolvedFunction
  let [, newlyCreated] = await Tag.findOrCreate({
    where: {
      guild_id: guildID,
      name,
    },
    defaults: {
      author_id: authorID,
      guild_id: guildID,
      last_used: null,
      uses: 0,
      value,
      name,
    },
  });

  if (newlyCreated) {
    return name;
  } else {
    throw new TagAlreadyExistsError(name);
  }
}

module.exports = {
  createTag,
  messageableCreateTag,
};
