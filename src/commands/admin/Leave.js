const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { SettingType, updateLeaveOrWelcome } = require('./');

module.exports = class Leave extends BaseCommand {
  constructor(bot) {
    super(bot);

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
    return 'leave';
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
   * @param msg
   * @param args
   * @returns {Promise.<void>}
   */
  async process(msg, args) {
    try {
      await this.set(msg, args);
    } catch (e) {
      this.bot.capture('leave: ', e);
    }
  }

  /**
   * @param {Message} msg
   * @param {string} args
   * @param {Leave} classInstance
   * @returns {Promise.<void>}
   */
  async set(msg, args) {
    try {
      const [guild, channelID] = [msg.channel.guild, msg.channel.id];
      const result = await updateLeaveOrWelcome(guild, channelID, msg.member, SettingType.LEAVE, args, this.bot.dataManager.guilds);

      await this.execute(msg, result);
    } catch (e) {
      this.bot.capture('leave: ', e);

      await this.execute(msg, e[1]);
    }
  }
};
