const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Ping extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['p'];
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'general';
  }

  get name() {
    return 'ping';
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

  async process(msg) {
    const before = Date.now();
    const latency = msg.channel.guild ? msg.channel.guild.shard.latency : this.bot.shards.get(0).latency;

    let content = this.bot._('c.ping.stage1', {
      latency,
    });

    return this.execute(msg, content, {
      edit: msg => {
        const diff = new Date(msg.timestamp) - before;

        content += '\n\n';
        content += this.bot._('c.ping.stage2', {
          diff,
        });

        return content;
      },
    });
  }
};
