const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { getImage } = require('../interactions');

module.exports = class Catgirl extends BaseCommand {
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
    return 'catgirl';
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
    const catgirl = await getImage('neko', this.bot);

    if (!catgirl) {
      return this.execute(msg, this.bot._('c.catgirl.error.retrieval'));
    }

    return this.execute(msg, {
      embed: {
        author: {
          name: this.bot._('c.catgirl.author'),
          url: catgirl,
        },
        color: 0xFF7F50,
        footer: {
          text: this.bot._('label.weebsh_footer'),
        },
        image: {
          url: catgirl,
        },
      },
    });
  }
};
