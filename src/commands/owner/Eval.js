const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class Eval extends BaseCommand {
  constructor(bot) {
    super(bot);

    // noinspection JSUnusedGlobalSymbols
    this.ownerOnly = true;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'owner';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'eval';
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
   * @returns {Promise.<void|Message>}
   */
  async process(msg, args) {
    const self = this;

    let result;

    try {
      // eslint-disable-next-line no-eval
      result = eval(args);
    } catch (e) {
      self.bot['log'].error(e);

      return self.execute(msg, {
        embed: {
          color: 0xFF9999,
          fields: [{
            name: 'Input',
            value: '```js\n' + args.substring(0, 1000) + '```',
          }, {
            name: 'Output',
            value: '```js\n' + e.name + ': ' + e.message.substring(0, 975) + '```',
          }],
        },
      });
    }

    if (result) {
      self.bot['log'].warn(result);
    }

    await self.execute(msg, {
      embed: {
        color: 0x66B266,
        fields: [{
          name: 'Input',
          value: '```js\n' + args.substring(0, 1000) + '```',
        }, {
          name: 'Output',
          value: '```js\n' + (result && typeof result !== 'object' ? result.toString().substring(0, 1000) : 'Eval Successfully Run') + '```',
        }],
      },
    });
  }
};
