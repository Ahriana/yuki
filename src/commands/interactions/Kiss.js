const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { getImage } = require('./');

module.exports = class Kiss extends BaseCommand {
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
    return 'kiss';
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
    const kiss = await getImage('kiss', this.bot);

    if (!kiss) {
      return this.execute(msg, this.bot._('c.kiss.error.retrieval'));
    } else if (args) {
      const user = this.bot.getUser(msg, args);

      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.kiss.other', {
              userA: user.username,
              userB: msg.author.username,
            }),
            url: kiss,
          },
          color: 0xFF3A3F,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: kiss,
          },
        },
      });
    } else {
      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.kiss.self', {
              user: msg.author.username,
            }),
            url: kiss,
          },
          color: 0xFF3A3F,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: kiss,
          },
        },
      });
    }
  }
};
