const Moment = require('moment');
const Sequelize = require('sequelize');
const sequelize = require('../').sequelize;
const DataTypes = Sequelize.DataTypes;

const Tag = sequelize.define('tag', {
  author_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  guild_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  last_used: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  uses: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
  },
  value: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

/**
 * Formats a tag into a name-value representation.
 *
 * These values are:
 * - name
 * - author name#discriminator
 * - number of uses
 * - creation date (readable time since)
 * - time last used
 *
 * The name defaults to 'N/A' if no user is in the cache.
 *
 * @param {Map<string, User>} userCache The cache of users.
 * @returns {string} The formatted representation of the tag.
 */
Tag.prototype.format = function (userCache) {
  // noinspection JSCheckFunctionSignatures
  const author = userCache.get(this.author_id);
  const authorName = author ? `${author.username}#${author.discriminator}` : 'N/A';
  const date = Moment(this.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss');
  const fromNow = Moment(this.createdAt).fromNow();
  const uses = this.uses || 0;
  const lastUsed = this.last_used ? Moment(this.last_used).fromNow() : 'N/A';

  return `
**Name**: ${this.name}
**Author**: ${authorName}
**Uses**: ${uses}
**Creation Date**: ${date} (${fromNow})
**Last Used**: ${lastUsed}
`;
};

module.exports = Tag;
