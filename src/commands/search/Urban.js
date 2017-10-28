const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const axios = require('axios');

module.exports = class Urban extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'search';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'urban';
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
   * @returns {Promise.<Message>}
   */
  async process(msg, args) {
    const input = args || 'Yuki+Nagato';

    const uri = `http://api.urbandictionary.com/v0/define?term=${input.split(' ').join('+')}`;

    let response;

    try {
      response = await axios.get(uri);
    } catch (e) {
      this.bot['log'].warn('Err getting urban', e);

      return this.execute(msg, this.bot._('c.urban.error.search'));
    }

    const definitionArray = response.data.list;

    if (definitionArray.length === 0) {
      return this.execute(msg, this.bot._('c.urban.no_result', {
        input,
      }));
    }

    const definition = definitionArray[Math.floor(Math.random() * (definitionArray.length))];

    const description = definition.definition.length > 2048
      ? definition.definition.substring(0, 2045) + '...' : definition.definition;

    return this.execute(msg, {
      embed: {
        color: 0x00004C,
        description,
        fields: [{
          name: this.bot._('c.urban.thumbs_up'),
          value: definition['thumbs_up'],
          inline: true,
        }, {
          name: this.bot._('c.urban.thumbs_down'),
          value: definition['thumbs_down'],
          inline: true,
        }, {
          name: 'Example',
          value: definition['example'].length > 1024 ? definition['example'].substring(0, 1021) + '...' : definition['example'],
        }],
        footer: {
          text: this.bot._('c.urban.author', {
            author: definition.author,
          }),
        },
        title: definition['word'],
        url: definition['permalink'],
      },
    });
  }
};
