const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { getImage } = require('../interactions');

module.exports = class Cry extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'images';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'cry';
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
   * @returns {Promise.<void|Message>}
   */
  async process(msg) {
    const cry = await getImage('cry', this.bot);

    if (!cry) {
      return this.execute(msg, this.bot._('c.cry.error.retrieval'));
    }

    return this.execute(msg, {
      embed: {
        author: {
          name: this.bot._('c.cry.author'),
          url: cry,
        },
        footer: {
          text: this.bot._('label.weebsh_footer'),
        },
        color: 0x30DDFF,
        image: {
          url: cry,
        },
      },
    });
  }
};
