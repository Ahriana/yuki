const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Tableflip extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['toggletableflip', 'tablefliptoggle'];
    // noinspection JSUnusedGlobalSymbols
    this.dm = false;
    // noinspection JSUnusedGlobalSymbols
    this.permissions = {
      'manageGuild': true,
    };
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'admin';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'tableflip';
  }

  /**
   * @returns {string}
   */
  get help() {
    const [description, example, usage] = this.bot._m(
      `help.${this.name}.description`,
      `help.${this.name}.examples`,
      `help.${this.name}.usage`,
    );

    return this.bot.helpCreator(this, description, usage, example);
  }

  /**
   * @param {Message} msg
   * @param {string} args
   * @returns {Promise.<void>}
   */
  async process(msg, args) {
    try {
      const content = await this.set(msg, args);

      return this.execute(msg, content);
    } catch (e) {
      this.bot.capture('tableflip: ', e);

      const content = this.bot._('c.tableflip.error.update');

      return this.execute(msg, {
        content,
      });
    }
  }

  /**
   * @param {Message} msg
   * @param {string} args
   * @returns {Promise.<void>|string}
   */
  async set(msg, args) {
    const guildSetting = await this.bot.dataManager.guilds.findOrDefault(msg.channel.guild.id);

    switch (args) {
      case 'enabled':
      case 'on':
      case 'true':
      case 'yes':
        guildSetting.tableflip_enabled = true;

        break;
      default:
        guildSetting.tableflip_enabled = !guildSetting.tableflip_enabled;
    }

    await this.bot.dataManager.guilds.save(guildSetting);

    const status = guildSetting.tableflip_enabled ? 'enabled' : 'disabled';

    return this.bot._(`c.tableflip.${status}`);
  }
};
