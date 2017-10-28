const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Sequelize = require('sequelize');
const { Image } = require('../../db/models');
const { ImageType } = require('../../enums');

module.exports = class Smug extends BaseCommand {
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
    return 'smug';
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
          type: ImageType.SMUG,
        },
      });
    } catch (e) {
      this.bot['log'].warn('Error retrieving smug image', e);

      return this.execute(msg, this.bot._('c.smug.error.retrieval'));
    }

    if (!result) {
      return this.execute(msg, this.bot._('c.smug.error.none'));
    }

    const smug = result.dataValues;

    return this.execute(msg, {
      embed: {
        author: {
          name: this.bot._('c.smug.author'),
          url: smug.url,
        },
        color: 0x0055FF,
        image: {
          url: smug.url,
        },
      },
    });
  }
};
