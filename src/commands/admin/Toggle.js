const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Toggle extends BaseCommand {
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
    return 'toggle';
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
    if (!args) {
      return this.execute(msg, this.bot._('c.toggle.no_argument'));
    }

    const command = args.toLowerCase();

    if (!this.bot['commands'].has(command)) {
      const content = this.bot._('c.toggle.not_command', {
        name: command,
      });

      return this.execute(msg, content);
    }

    if (command === 'toggle') {
      const content = this.bot._('c.toggle.error.untoggleable', {
        name: command,
      });

      return this.execute(msg, content);
    }

    try {
      const disabled = await this.set(msg, command);
      const status = disabled ? 'disabled' : 'enabled';
      const content = this.bot._('c.toggle.toggled', {
        command,
        status,
      });

      return this.execute(msg, content);
    } catch (e) {
      this.bot.capture('toggle: ', e);

      return this.execute(msg, this.bot._('c.toggle.error.update'));
    }
  }

  /**
   * @param {Message} msg
   * @param {string} cmd
   * @returns {Promise.<boolean>}
   */
  async set(msg, cmd) {
    const guildSetting = await this.bot.dataManager.guilds.findOrDefault(msg.channel.guild.id);

    let isDisabled = guildSetting.isCommandDisabled(cmd);

    if (isDisabled) {
      guildSetting.enableCommand(cmd);
    } else {
      guildSetting.disableCommand(cmd);
    }

    await this.bot.dataManager.guilds.save(guildSetting);

    return !isDisabled;
  }
};
