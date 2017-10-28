const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Clean extends BaseCommand {
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
    return 'clean';
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
    const input = /^\d+$/.test(args) ? parseInt(args) : 50;

    if (input > 200) {
      return this.execute(msg, 'You can only clean a maximum of 200 messages at once');
    }

    if (msg.channel.guild && msg.channel.permissionsOf(this.bot.user.id).has('manageMessages')) {
      let deleted;

      try {
        deleted = await msg.channel.purge(input, msg => {
          return msg.author.id === this.bot.user.id;
        }, msg.id);
      } catch (e) {
        this.bot.capture('clean: ', e);

        return this.execute(msg, this.bot._('c.clean.error.deleting'));
      }

      return this.execute(msg, this.bot._('c.clean.finished', {
        amount: deleted,
        mention: msg.channel.mention,
        input,
      }));
    } else {
      let messages = await msg.channel.getMessages(input, msg.id);

      messages = messages.filter(msg => msg.author.id === this.bot.user.id);

      messages.forEach(async msg => {
        await msg.delete();
      });

      return this.execute(msg, this.bot._('c.clean.finished', {
        amount: messages.length,
        mention: msg.channel.mention,
        input,
      }));
    }
  }
};
