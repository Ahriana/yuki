const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Sequelize = require('sequelize');
const { Ship: ShipModel } = require('../../db/models');

module.exports = class Shipgirl extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['ship'];
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
    return 'shipgirl';
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
    let found = false;
    let image, name, text;

    if (args) {
      const formatedArgs = stringToSnakeCase(args);
      const result = await this.shipByName(formatedArgs);

      if (result) {
        [name, image] = result;

        found = true;
      }
    }

    if (!name) {
      [name, image] = await this.shipRandom();
    }

    name = snakeCaseToName(name);

    if (args && !found) {
      text = this.bot._('c.shipgirl.none_found', {
        ship: args,
        name: name,
      });
    } else {
      text = `${name}`;
    }

    return this.execute(msg, {
      embed: {
        author: {
          name: text,
          url: image,
        },
        color: 0x31698A,
        image: {
          url: image,
        },
      },
    });
  }

  async shipByName(name) {
    if (!name) {
      return;
    }

    let result;

    try {
      // noinspection JSUnresolvedFunction
      result = await ShipModel.findOne({
        order: [
          Sequelize.fn('RANDOM'),
        ],
        where: {
          name: name,
        },
      });
    } catch (e) {
      this.bot.capture('shipgirl: ', e);

      return;
    }

    if (!result) {
      return;
    }

    return [result.name, result.url];
  }

  async shipRandom() {
    let result;

    try {
      // noinspection JSUnresolvedFunction
      result = await ShipModel.findOne({
        order: [
          Sequelize.fn('RANDOM'),
        ],
      });
    } catch (e) {
      this.bot.capture('shipgirl: ', e);

      return;
    }

    return [result.name, result.url];
  }
};

function snakeCaseToName(input) {
  return input
    .replace('_', ' ')
    .replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function stringToSnakeCase(input) {
  return input.replace(' ', '_').toLowerCase();
}
