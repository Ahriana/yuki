const { GuildSetting } = require('../db/models');

module.exports = class GuildManager extends Map {

  /**
   *
   * @param {string} guildId
   * @param {GuildSetting.dataValues} values
   * @returns {GuildSetting}
   */
  async create(guildId, values) {
    values['guild_id'] = guildId;

    const guildSetting = await GuildSetting.create(values);
    this.set(guildId, guildSetting);

    return guildSetting;
  }
  /**
   * @param {GuildSetting} guildSetting
   */
  async destroy(guildId) {
    await GuildSetting.destroy({
      where: {
        guild_id: guildId,
      },
    });

    this.delete(guildId);
  }

  /**
   * @param {string} guildId
   * @returns {Promise.<GuildSetting>}
   */
  async find(guildId) {
    if (this.has(guildId)) {
      return this.get(guildId);
    }

    const guildSetting = GuildSetting.findOne({
      where: {
        guild_id: guildId,
      },
    });

    this.set(guildId, guildSetting);

    return guildSetting;
  }

  async findOrDefault(guildId) {
    if (this.has(guildId)) {
      return this.get(guildId);
    }

    const guildSetting = await this.findOrCreate(guildId, {
      disabled_commands: [],
      guild_id: guildId,
      muted_channel_ids: [],
      tableflip_enabled: false,
    });

    this.set(guildId, guildSetting);

    return guildSetting;
  }

  /**
   * @param {string} guildId
   * @param {GuildSetting.dataValues} defaults
   * @returns {GuildSetting}
   */
  async findOrCreate(guildId, defaults) {
    if (this.has(guildId)) {
      return this.get(guildId);
    }

    const [guildSetting] = await GuildSetting.findOrCreate({
      where: {
        guild_id: guildId,
      },
      defaults,
    });

    this.set(guildId, guildSetting);

    return guildSetting;
  }

  async populate() {
    /**
     * @type {GuildSetting[]}
     */
    const guildSettings = await GuildSetting.findAll();

    for (const guildSetting of guildSettings) {
      this.set(guildSetting.guild_id, guildSetting);
    }
  }

  /**
   * @param {GuildSetting} guildSetting
   */
  async save(guildSetting) {
    await guildSetting.save();

    this.set(guildSetting.guild_id, guildSetting);
  }
};
