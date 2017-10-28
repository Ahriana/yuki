const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class DisabledCommands extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'general';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'disabledcommands';
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
   * @returns {Promise.<void|Message>}
   */
  async process(msg) {
    let guildSetting;

    try {
      guildSetting = await this.bot.dataManager.guilds.findOrDefault(msg.channel.guild.id);
    } catch (e) {
      this.bot.capture('disabledcommands: ', e);

      return this.execute(msg, this.bot._('c.disabledcommands.error.update'));
    }

    if (!guildSetting) {
      return this.execute(msg, this.bot._('c.disabledcommands.none'));
    }

    if (guildSetting.disabled_commands.length === 0) {
      return this.execute(msg, this.bot._('c.disabledcommands.none'));
    }

    const bound = this.bot._('c.disabledcommands.count', {
      total: guildSetting.disabled_commands.length,
    });
    const disabledCommandsList = guildSetting.disabled_commands.join('\n');
    const content = `\`\`\`markdown
### ${bound} ###
${disabledCommandsList}
\`\`\``;

    return this.execute(msg, content);
  }
};
