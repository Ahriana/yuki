const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Sequelize = require('sequelize');
const { Image } = require('../../db/models');
const { ImageType } = require('../../enums');

module.exports = class Dance extends BaseCommand {
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
    return 'dance';
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
          type: ImageType.DANCE,
        },
      });
    } catch (e) {
      this.bot.capture('dance: ', e);

      return this.execute(msg, this.bot._('c.dance.error.retrieval'));
    }

    if (!result) {
      return this.execute(msg, this.bot._('c.dance.error.none'));
    }

    const image = result.dataValues;

    return this.execute(msg, {
      embed: {
        author: {
          name: this.bot._('c.dance.author'),
          url: image.url,
        },
        color: 0x00A100,
        image: {
          url: image.url,
        },
      },
    });
  }
};
