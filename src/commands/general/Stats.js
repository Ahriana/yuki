const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const os = require('os');

module.exports = class Stats extends BaseCommand {
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
    return 'stats';
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
   * @returns {Promise.<Message>}
   */
  async process(msg, args) {
    if (args === 'usage') {
      let usageCounts = [];

      this.bot['commandUsage'].forEach((usage, command) => {
        if (usage !== 0) {
          usageCounts.push({
            name: command,
            usage: usage,
          });
        }
      });

      let commandUsage = 0;

      this.bot['commandUsage'].forEach(usage => {
        commandUsage = commandUsage + usage;
      });

      const text = `${'```'}markdown
### Command Usage(Total: ${commandUsage}) ###
${usageCounts.sort((a, b) => b.usage - a.usage).map(value => '[' + value.name + ']' + '(' + value.usage + ')').join('\n')}
${'```'}`;

      return this.execute(msg, text);
    }

    let commandUsage = 1;

    this.bot['commandUsage'].forEach(usage => {
      commandUsage = commandUsage + usage;
    });

    const serverUptime = os.uptime();

    const description = `
**Bot Uptime**: ${Math.floor(this.bot.uptime / 86400000)}d : ${Math.floor((this.bot.uptime / 3600000) % 24)}h : ${Math.floor((this.bot.uptime / 60000) % 60)}m : ${Math.floor((this.bot.uptime / 1000) % 60)}s
**Process Uptime**: ${Math.floor(process.uptime() / 86400)}d : ${Math.floor((process.uptime() / 3600) % 24)}h : ${Math.floor((process.uptime() / 60) % 60)}m : ${Math.floor((process.uptime()) % 60)}s
**Server Uptime**: ${Math.floor(serverUptime / 86400)}d : ${Math.floor((serverUptime / 3600) % 24)}h : ${Math.floor((serverUptime / 60) % 60)}m : ${Math.floor((serverUptime) % 60)}s
**Memory Usage**: RSS: ${(process.memoryUsage().rss / 1024 / 1000).toFixed(2)}MB | Heap Used: ${(process.memoryUsage().heapUsed / 1024 / 1000).toFixed(2)}MB
`;

    let memberCount = 0;

    this.bot.guilds.forEach(g => {
      memberCount += g.memberCount;
    });

    return this.execute(msg, {
      embed: {
        color: 0xff69b4,
        description,
        fields: [{
          inline: true,
          name: this.bot._('discord.channel.name.plural'),
          value: Object.keys(this.bot.channelGuildMap).length,
        }, {
          inline: true,
          name: this.bot._('discord.guild.name.plural'),
          value: this.bot.guilds.size,
        }, {
          inline: true,
          name: this.bot._('discord.user.name.plural'),
          value: this.bot.users.size,
        }, {
          inline: true,
          name: this.bot._('c.stats.user_average'),
          value: (memberCount / this.bot.guilds.size).toFixed(2),
        }, {
          inline: true,
          name: this.bot._('c.stats.total_commands_used'),
          value: commandUsage,
        }],
        timestamp: new Date(),
        title: this.bot._('c.stats.yuki_statistics'),
      },
    });
  }
};
