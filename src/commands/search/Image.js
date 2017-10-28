const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const axios = require('axios');

module.exports = class Image extends BaseCommand {
  constructor(bot) {
    super(bot);

    // noinspection JSUnusedGlobalSymbols
    this.maxMessage = this.bot._('search.max_length');
    this.aliases = ['img'];
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
    return 'image';
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
    args = args || 'Yuki Nagato';

    let response;
    let image;

    for (const type of ['png', 'jpg']) {
      try {
        response = await axios.get('https://api.imgur.com/3/gallery/search/top/all', {
          params: {
            q_type: type,
            q_all: args,
          },
          headers: {
            'Authorization': `Client-ID ${this.bot.apiKeys.imgur}`,
          },
        });
      } catch (e) {
        this.bot.log.warn(`Error retrieving image: ${args}`, e);

        return this.noneFound(args, msg);
      }

      if (response.data.data.length !== 0) {
        image = Image.returnSFWImage(response.data.data);

        break;
      }
    }

    if (!image) {
      return this.noneFound(args, msg);
    }

    return this.execute(msg, {
      embed: {
        color: 0x4B0082,
        footer: {
          text: image.title.length > 2048 ? image.title : image.title.substring(0, 2045) + '...',
        },
        image: {
          url: image.link,
        },
      },
    });
  }

  /** If no images found
   *
   * @param {string} input
   * @param {Message} msg
   * @returns {Promise.<void>}
   */
  async noneFound(input, msg) {
    return this.execute(msg, this.bot._('c.image.none_found', {
      search: input,
    }));
  }

  /**
   * @param {object[]} data
   * @returns {object | null}
   */
  static returnSFWImage(data) {
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
