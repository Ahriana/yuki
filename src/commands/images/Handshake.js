const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Sequelize = require('sequelize');
const { Image } = require('../../db/models');
const { ImageType } = require('../../enums');

module.exports = class Handshake extends BaseCommand {
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
    return 'handshake';
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
          type: ImageType.HANDSHAKE,
        },
      });
    } catch (e) {
      this.bot.capture('handshake: ', e);

      return this.execute(msg, this.bot._('c.handshake.error.retrieval'));
    }

    if (!result) {
      return this.execute(msg, this.bot._('c.handshake.error.none'));
    }

    return this.execute(msg, {
      embed: {
        author: {
          name: this.bot._('c.handshake.author'),
          url: result.url,
        },
        color: 0x0055FF,
        image: {
          url: result.url,
        },
      },
    });
  }
};
