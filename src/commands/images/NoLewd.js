const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Sequelize = require('sequelize');
const { Image } = require('../../db/models');
const { ImageType } = require('../../enums');

module.exports = class NoLewd extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['lewd'];
  }

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
    return 'nolewd';
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
    let result;

    try {
      // noinspection JSUnresolvedFunction
      result = await Image.findOne({
        order: [
          Sequelize.fn('RANDOM'),
        ],
        where: {
          type: ImageType.LEWD,
        },
      });
    } catch (e) {
      this.bot.capture('nolewd: ', e);

      return this.execute(msg, this.bot._('c.nolewd.error.retrieval'));
    }

    if (!result) {
      return this.execute(msg, this.bot._('c.nolewd.error.none'));
    }

    const image = result.dataValues;

    return this.execute(msg, {
      embed: {
        author: {
          name: this.bot._('c.nolewd.author'),
          url: image.url,
        },
        color: 0xEB13DF,
        image: {
          url: image.url,
        },
      },
    });
  }
};
