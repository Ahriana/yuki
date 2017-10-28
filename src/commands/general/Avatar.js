const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Avatar extends BaseCommand {
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
    return 'avatar';
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
    const user = this.bot.getUser(msg, args);

    let url = user.avatarURL;

    if (url.includes('.gif')) {
      url = url.substring(0, url.indexOf('?'));
    }

    const authorName = this.bot._('c.avatar.author', {
      name: user.username,
    });

    return this.execute(msg, {
      embed: {
        author: {
          name: authorName,
          url,
        },
        image: {
          url,
        },
        color: 0xC081C0,
      },
    });
  }
};
