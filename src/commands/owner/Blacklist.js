const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { Blacklist: BlacklistModel } = require('../../db/models');
const { BlacklistType } = require('../../enums');

module.exports = class Blacklist extends BaseCommand {
  constructor(bot) {
    super(bot);

    // noinspection JSUnusedGlobalSymbols
    this.ownerOnly = true;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'owner';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'blacklist';
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
   * @returns {Promise.<void|Message>}
   */
  async process(msg, args) {
    if (this.bot.users.has(args)) {
      try {
        // noinspection JSUnresolvedFunction
        await BlacklistModel.create({
          target_id: args,
          type: BlacklistType.USER.toString(),
        });
      } catch (e) {
        this.bot['log'].warn(`Err blacklisting user ${args}`, e);

        return this.execute(msg, this.bot._('c.blacklist.error.user'));
      }

      return this.execute(msg, this.bot._('c.blacklist.success.user'));
    } else if (this.bot.guilds.has(args)) {
      try {
        // noinspection JSUnresolvedFunction
        await BlacklistModel.create({
          target_id: args,
          type: BlacklistType.GUILD.toString(),
        });
      } catch (e) {
        this.bot['log'].warn(`Err blacklisting guild ${args}`, e);

        return this.execute(msg, this.bot._('c.blackilist.error.guild'));
      }

      return this.execute(msg, this.bot._('c.blacklist.success.guild'));
    } else {
      return this.execute(msg, this.bot._('c.blacklist.error.none', {
        value: args,
      }));
    }
  }
};
