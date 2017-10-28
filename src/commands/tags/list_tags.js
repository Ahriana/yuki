const { normalizeText } = require('../../utils');
const { Tag } = require('../../db/models');

/**
 * This never rejects.
 *
 * @param {TagRequestData} request
 * @returns {Promise.<string>}
 */
async function messageableListTags(request) {
  try {
    return listTags(request.guild.id, request.chisarok);
  } catch (e) {
    return request.chisarok._('c.tag.list.error.retrieval');
  }
}

/**
 * @param {string} guildID
 * @param {Chisarok} chisarok
 * @returns {Promise.<string>}
 */
async function listTags(guildID, chisarok) {
  // noinspection JSUnresolvedFunction
  const tags = await Tag.findAll({
    where: {
      guild_id: guildID,
    },
  });

  let list = chisarok._('c.tag.list.count', {
    number: tags.length,
  }) + '\n';

  for (const tag of tags) {
    const normalized = normalizeText(tag.name);
    const displayed = `**${normalized}**`;

    if (list.length + displayed.length + 2 > 1900) {
      list += '...';

      break;
    }

    list += `${displayed}, `;
  }

  // Trim off the extra ending `, `.
  return list.substring(0, list.length - 2);
}

module.exports = {
  messageableListTags,
  listTags,
};
