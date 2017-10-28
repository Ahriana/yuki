const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Sequelize = require('sequelize');
const { Pun: PunModel } = require('../../db/models');

module.exports = class Pun extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'miscellaneous';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'pun';
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
      result = await PunModel.findOne({
        order: [
          Sequelize.fn('RANDOM'),
        ],
      });
    } catch (e) {
      this.bot['log'].warn('Error retrieving pun', e);

      return this.execute(msg, this.bot._('c.pun.error.retrieval'));
    }

    if (!result) {
      return this.execute(msg, this.bot._('c.pun.error.none'));
    }

    const pun = result.dataValues;

    return this.execute(msg, pun.content);
  }
};
