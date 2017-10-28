const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { getImage } = require('./');

module.exports = class Slap extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'interactions';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'slap';
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
    const slap = await getImage('slap', this.bot);

    if (!slap) {
      return this.execute(msg, this.bot._('c.slap.error.retrieval'));
    } else if (args) {
      const user = this.bot.getUser(msg, args);

      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.slap.other', {
              userA: user.username,
              userB: msg.author.username,
            }),
            url: slap,
          },
          color: 0xB266B2,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: slap,
          },
        },
      });
    } else {
      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.slap.self', {
              user: msg.author.username,
            }),
            url: slap,
          },
          color: 0xB266B2,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: slap,
          },
        },
      });
    }
  }
};
