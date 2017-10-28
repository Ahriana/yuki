const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Info extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.botLibVersion = require('nagato/package.json').version;
    this.libVersion = require('eris/package.json').version;
  }

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
    return 'info';
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
   * @returns {Promise.<void>}
   */
  async process(msg) {
    const authorName = this.bot._('c.info.author_name', {
      name: this.bot.user.username,
    });
    const link = this.bot._('label.link');

    const prefixes = this.bot['messageHandlerOptions'].defaultPrefixes.map(p => {
      if (p === 'mention') {
        p = `@${this.bot.user.username}#${this.bot.user.discriminator}`;
      }

      return '"`' + p + '`"';
    }).join(', ');

    return this.execute(msg, {
      embed: {
        author: {
          name: authorName,
          icon_url: this.bot.user.staticAvatarURL,
        },
        color: 0xC081C0,
        description: this.bot._('c.info.disclaimer'),
        fields: [{
          name: this.bot._('c.info.developers'),
          value: 'mei#5429 & zeyla#5479',
          inline: true,
        }, {
          name: this.bot._('c.info.default_prefixes'),
          value: prefixes,
          inline: true,
        }, {
          name: this.bot._('c.info.support_server'),
          value: `[${link}](https://discord.gg/0lBiROCNVaGw5Eqk)`,
          inline: true,
        }, {
          name: this.bot._('c.info.discord_library'),
          value: `Eris v${this.libVersion}`,
          inline: true,
        }, {
          name: this.bot._('c.info.help_command.plural_optional'),
          value: this.bot['help']['helpCommands'].join(', '),
          inline: true,
        }, {
          name: this.bot._('c.info.bot_invite'),
          value: `[${link}](https://discordapp.com/oauth2/authorize?&client_id=161620224305528833&scope=bot&permissions=67365888)`,
          inline: true,
        }, {
          name: this.bot._('c.info.donate', {
            name: this.bot.user.username,
          }),
          value: '[Patreon](https://patreon.com/YukiDev)',
        }],
        footer: {
          text: this.bot._('c.info.framework', {
            version: this.botLibVersion,
          }),
          icon_url: 'http://i.imgur.com/FLuZrqa.jpg',
        },
      },
    });
  }
};
