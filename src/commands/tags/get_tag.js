const { Tag } = require('../../db/models');
const { sequelize } = require('../../db');
const { helpCreator } = require('../../utils');

/**
 * Retrieves a tag and returns its value, or returns an appropriate error
 * message.
 *
 * This never rejects.
 *
 * @param {TagRequestData} request
 * @returns {Promise.<string>}
 */
async function messageableGetTag(request) {
  const name = request.subcommandArgs.join(' ');

  if (!name || name.length === 0) {
    const [description, examples, usage] = request.chisarok._m(
      'help.tag.get.description',
      'help.tag.get.examples',
      'help.tag.get.usage',
    );

    return helpCreator('tag get', description, usage, examples);
  }

  try {
    // We need to use raw SQL here because sequelize does not support the
    // functionality we want.
    //
    // What this will do is update the `uses` column by 1, and then return the
    // record.
    //
    // Sequelize does not support this operation, and would require us to
    // retrieve the tag with a query and then update the tag with a second
    // query.
    //
    // tl;dr: performance.
    const query = `update tags set uses = uses + 1, last_used=:now where
                   guild_id=:guild_id and name=:name returning *;`;

    // noinspection JSUnresolvedFunction
    const tag = await sequelize.query(query, {
      model: Tag,
      replacements: {
        guild_id: request.guild.id,
        now: new Date,
        name,
      },
    });

    if (tag.length === 0 || !tag[0]) {
      return request.chisarok._('c.tag.get.error.nonexistent', {
        name,
      });
    }

    return tag[0].value;
  } catch (e) {
    return request.chisarok._('c.tag.tag.error.retrieval');
  }
}

module.exports = {
  messageableGetTag,
};
