const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const axios = require('axios');

module.exports = class Youtube extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['yt'];
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
    return 'youtube';
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
   * @param args
   * @returns {Promise.<void|Message>}
   */
  async process(msg, args) {
    const input = args || 'The Melancholy of Haruhi Suzumiya Trailer';

    let result;

    try {
      result = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: this.bot.apiKeys.youtube,
          q: input,
          maxResults: 1,
          part: 'snippet',
          type: 'video',
        },
      });
    } catch (e) {
      this.bot['log'].warn(`Youtube search error ${input}`, e);

      return this.execute(msg, this.bot._('c.youtube.error.search', {
        input,
      }));
    }

    result = result.data.items;

    if (result.length === 0) {
      return this.execute(msg, this.bot._('c.youtube.no_result'));
    }

    return this.execute(msg, this.bot._('c.youtube.result', {
      result: result[0].id['videoId'],
      input,
    }));
  }
};
