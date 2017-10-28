const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { getImage } = require('./');

module.exports = class Cuddle extends BaseCommand {
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
    return 'cuddle';
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
    const cuddle = await getImage('cuddle', this.bot);

    if (!cuddle) {
      return this.execute(msg, this.bot._('c.cuddle.error.retrieval'));
    } else if (args) {
      const user = this.bot.getUser(msg, args);

      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.cuddle.other', {
              userA: user.username,
              userB: msg.author.username,
            }),
            url: cuddle,
          },
          color: 0xB9FFDA,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: cuddle,
          },
        },
      });
    } else {
      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.cuddle.self', {
              user: msg.author.username,
            }),
            url: cuddle,
          },
          color: 0xB9FFDA,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: cuddle,
          },
        },
      });
    }
  }
};
