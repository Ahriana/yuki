const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { getImage } = require('../interactions');

module.exports = class Pout extends BaseCommand {
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
    return 'pout';
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
    const pout = await getImage('pout', this.bot);

    if (!pout) {
      return this.execute(msg, this.bot._('c.pout.error.retrieval'));
    }

    return this.execute(msg, {
      embed: {
        author: {
          name: this.bot._('c.pout.author'),
          url: pout,
        },
        color: 0xB9005C,
        footer: {
          text: this.bot._('label.weebsh_footer'),
        },
        image: {
          url: pout,
        },
      },
    });
  }
};
