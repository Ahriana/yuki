const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { getImage } = require('./');

module.exports = class Pat extends BaseCommand {
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
    return 'pat';
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
    const pat = await getImage('pat', this.bot);

    if (!pat) {
      return this.execute(msg, this.bot._('c.pat.error.retrieval'));
    } else if (args) {
      const user = this.bot.getUser(msg, args);

      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.pat.other', {
              userA: user.username,
              userB: msg.author.username,
            }),
            url: pat,
          },
          color: 0xDAB9FF,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: pat,
          },
        },
      });
    } else {
      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.pat.self', {
              user: msg.author.username,
            }),
            url: pat,
          },
          color: 0xDAB9FF,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: pat,
          },
        },
      });
    }
  }
};
