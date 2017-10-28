const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const axios = require('axios');

module.exports = class Gif extends BaseCommand {
  constructor(bot) {
    super(bot);

    // noinspection JSUnusedGlobalSymbols
    this.maxMessage = this.bot._('search.max_length');
  }

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
    return 'gif';
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
    const input = args || 'Yuki Nagato';

    let response;

    try {
      response = await axios.get('https://api.imgur.com/3/gallery/search/top', {
        params: {
          q_type: 'gif',
          q_all: input,
        },
        headers: {
          'Authorization': `Client-ID ${this.bot.apiKeys.imgur}`,
        },
      });
    } catch (e) {
      this.bot['log'].warn(`Error retrieving gif: ${input}`, e);

      return this.noneFound(input, msg);
    }

    if (response.data.data.length === 0) {
      return this.noneFound(input, msg);
    }

    const image = Gif.returnSFWGif(response.data.data);

    if (!image) {
      return this.noneFound(input, msg);
    }

    return this.execute(msg, {
      embed: {
        color: 0x00a368,
        image: {
          url: image.link,
        },
        footer: {
          text: image.title.length > 2048 ? image.title : image.title.substring(0, 2045) + '...',
        },
      },
    });
  }

  /** If no gifs found
   *
   * @param {string} input
   * @param {Message} msg
   * @returns {Promise.<void>}
   */
  async noneFound(input, msg) {
    return this.execute(msg, this.bot._('c.gif.none_found', {
      search: input,
    }));
  }

  /**
   * @param {object[]} data
   * @returns {object | null}
   */
  static returnSFWGif(data) {
    while (data.length > 0) {
      const index = Math.floor(Math.random() * data.length);

      if (!data[index].nsfw && !data[index]['is_album']) {
        return data[index];
      }

      data.splice(index, 1);
    }

    return null;
  }
};
