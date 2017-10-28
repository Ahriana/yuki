const Middleware = require('nagato/lib/Middleware');

module.exports = class DatabaseMiddleware extends Middleware {
  /**
   * @param {Channel} channel
   * @param {string} cmd
   * @param {string} args
   * @returns {boolean}
   */
  async checkChannel(channel, cmd, args) {
    if (cmd === 'channelmute' || (cmd === 'setting' && args === 'channelmute')) {
      return false;
    }

    if (!channel['guild']) {
      return false;
    }

    const guildSetting = await this.bot.dataManager.guilds.findOrDefault(channel.guild.id);

    if (!guildSetting || !guildSetting.muted_channel_ids) {
      this.bot.capture(new Error(
        `No muted_channel_ids: ${channel.id}, ${JSON.stringify(guildSetting)}`,
      ));
    }

    return guildSetting && guildSetting.muted_channel_ids ? guildSetting.muted_channel_ids.includes(channel.id) : false;
  }

  /**
   * @param {Guild} guild
   * @param {string} cmd
   * @returns {boolean}
   */
  async checkCommand(guild, cmd) {
    if (!guild) {
      return false;
    }

    const guildSetting = await this.bot.dataManager.guilds.findOrDefault(guild.id);

    if (!guildSetting || !guildSetting.disabled_commands) {
      this.bot.capture(new Error(
        `No disabled_commands: ${guild.id}, ${JSON.stringify(guildSetting)}`,
      ));
    }

    return guildSetting && guildSetting.disabled_commands ? guildSetting.disabled_commands.includes(cmd) : null;
  }

  /**
   * @param {Guild} guild
   * @returns {?string}
   */
  async checkPrefix(guild) {
    if (!guild) {
      return null;
    }

    const guildSettings = await this.bot.dataManager.guilds.findOrDefault(guild.id);

    return guildSettings ? guildSettings.prefix : null;
  }

  /**
   * @param {string} userId
   * @returns {boolean}
   */
  async checkUser(userId) {
    return this.bot.dataManager.blacklists.userIsBlacklisted(userId);
  }

  /**
   * @param {Guild} guild
   * @returns {boolean}
   */
  async checkGuild(guild) {
    if (!guild) {
      return false;
    }

    return this.bot.dataManager.blacklists.guildIsBlacklisted(guild.id);
  }
};
