const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { getImage } = require('./');

module.exports = class Hug extends BaseCommand {
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
    return 'hug';
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
    const hug = await getImage('hug', this.bot);

    if (!hug) {
      return this.execute(msg, this.bot._('c.hug.error.retrieval'));
    } else if (args) {
      const user = this.bot.getUser(msg, args);

      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.hug.other', {
              userA: user.username,
              userB: msg.author.username,
            }),
            url: hug,
          },
          color: 0xB9FFFD,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: hug,
          },
        },
      });
    } else {
      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.hug.self'),
            url: hug,
          },
          color: 0xB9FFFD,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: hug,
          },
        },
      });
    }
  }
};
