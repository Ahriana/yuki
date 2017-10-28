const Blacklist = require('../db/models/Blacklist');
const BlacklistType = require('../enums');

module.exports = class BlacklistManager {
  constructor() {
    /**
     * @type {Set<string>}
     */
    this.guilds = new Set();
    /**
     * @type {Set<string>}
     */
    this.users = new Set();
  }

  /**
   * @param {string} guildId
   * @returns {boolean}
   */
  guildIsBlacklisted(guildId) {
    return this.guilds.has(guildId);
  }

  /**
   * @param {string} id
   * @returns {boolean}
   */
  isBlacklisted(id) {
    return this.guildIsBlacklisted(id) || this.userIsBlacklisted(id);
  }

  async populate() {
    /**
     * @type {Blacklist[]}
     */
    const blacklists = await Blacklist.findAll();

    for (const blacklist of blacklists) {
      switch (blacklist.type) {
        case BlacklistType.GUILD:
          this.guilds.add(blacklist.target_id);

          break;
        case BlacklistType.USER:
          this.users.add(blacklist.target_id);

          break;
      }
    }
  }

  /**
   * @param {string} userId
   * @returns {boolean}
   */
  userIsBlacklisted(userId) {
    return this.users.has(userId);
  }
};
