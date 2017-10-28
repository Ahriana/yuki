const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class ServerInfo extends BaseCommand {
  constructor(bot) {
    super(bot);

    // noinspection JSUnusedGlobalSymbols
    this.dm = false;
    this.aliases = ['guildinfo'];
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
    return 'serverinfo';
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
    const guild = msg.channel.guild;
    const owner = this.bot.users.get(guild.ownerID);

    const textCount = guild.channels.filter(c => c.type === 0).length;
    const voiceCount = guild.channels.filter(c => c.type === 2).length;
    const botCount = guild.members.filter(u => u.bot).length;
    const botPlural = botCount === 1 ? '' : 's';

    const online = guild.members.filter(m => m.status === 'online').length;
    const idle = guild.members.filter(m => m.status === 'idle').length;
    const dnd = guild.members.filter(m => m.status === 'dnd').length;
    const offline = guild.memberCount - (online + idle + dnd);

    let explicitText;

    switch (guild.explicitContentFilter) {
      case 0:
        explicitText = this.bot._(
          'discord.guild.explicit_content_filter.0',
        );

        break;
      case 1:
        explicitText = this.bot._(
          'discord.guild.explicit_content_filter.1',
        );

        break;
      case 2:
        explicitText = this.bot._(
          'discord.guild.explicit_content_filter.2',
        );

        break;
      default:
        explicitText = this.bot._('label.unknown');
    }

    let verificationText;

    switch (guild.verificationLevel) {
      case 0:
        verificationText = this.bot._('discord.guild.verification.0');

        break;
      case 1:
        verificationText = this.bot._('discord.guild.verification.1');

        break;
      case 2:
        verificationText = this.bot._('discord.guild.verification.2');

        break;
      case 3:
        verificationText = this.bot._('discord.guild.verification.3');

        break;
      case 4:
        verificationText = this.bot._('discord.guild.verification.4');

        break;
      default:
        verificationText = this.bot._('label.unknown');
    }

    let defaultNotificationsText;

    switch (guild.defaultNotifications) {
      case 0:
        defaultNotificationsText = this.bot._(
          'discord.guild.default_notifications.0',
        );

        break;
      case 1:
        defaultNotificationsText = this.bot._(
          'discord.guild.default_notifications.1',
        );

        break;
      default:
        defaultNotificationsText = this.bot._('label.unknown');
    }

    const [
      labelExplicitText,
      labelNotifications,
      labelVerification,
    ] = this.bot._m(
      'discord.guild.explicit_content_filter.name',
      'discord.guild.default_notifications.name',
      'discord.guild.verification.name',
      );

    let description = `
**${labelExplicitText}**: ${explicitText}
**${labelVerification}**: ${verificationText}
**${labelNotifications}**: ${defaultNotificationsText}
`;

    if (guild.afkChannelID) {
      const channel = guild.channels.get(guild.afkChannelID);

      if (channel) {
        const [labelAfkChannel, labelAfkTimeout] = this.bot._m(
          'discord.guild.afk_channel',
          'discord.guild.afk_channel_timeout',
        );

        description += `**${labelAfkChannel}**: ${channel.mention}\n`;
        description += `**${labelAfkTimeout}**: ${guild.afkTimeout} seconds`;
      }
    }

    return this.execute(msg, {
      embed: {
        color: 0x39a6c4,
        description: description,
        fields: [{
          inline: true,
          name: this.bot._('label.id'),
          value: guild.id,
        }, {
          inline: true,
          name: this.bot._('discord.guild.region.name'),
          value: guild.region,
        }, {
          inline: true,
          name: this.bot._('label.owner'),
          value: `${owner.username}#${owner.discriminator}`,
        }, {
          inline: true,
          name: this.bot._('label.members'),
          value: `${guild.memberCount} (${botCount} bot${botPlural})`,
        }, {
          inline: true,
          name: this.bot._('label.member_status'),
          value: `${online} Online / ${idle} Idle / ${dnd} DnD / ${offline} Offline`,
        }, {
          inline: true,
          name: this.bot._('label.channels'),
          value: `${textCount} text / ${voiceCount} voice`,
        }, {
          inline: true,
          name: this.bot._('label.roles'),
          value: `${guild.roles.size}`,
        }],
        image: {
          url: guild.iconURL,
        },
        title: this.bot._('c.serverinfo.title', {
          serverName: guild.name,
        }),
        url: guild.iconURL,
      },
    });
  }
};
