const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { SettingType, updateLeaveOrWelcome } = require('./');

module.exports = class Welcome extends BaseCommand {
  constructor(bot) {
    super(bot);

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
    return 'welcome';
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
      await this.set(msg, args);
    } catch (e) {
      this.bot.capture('welcome: ', e);
    }
  }

  /**
   * @param {Message} msg
   * @param {string} args
   * @returns {string}
   */
  async set(msg, args) {
    try {
      const [guild, channelID] = [msg.channel.guild, msg.channel.id];
      const result = await updateLeaveOrWelcome(guild, channelID, msg.member, SettingType.WELCOME, args, this.bot.dataManager.guilds);

      await this.execute(msg, result);
    } catch (e) {
      if (e[0]) {
        this.bot.capture('welcome: ', e);
      }

      return e[1];
    }
  }
};
