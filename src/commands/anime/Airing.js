const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Nani = require('nani');
const moment = require('moment');

module.exports = class Airing extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['air'];

    Airing.bot = bot;
    Airing.currentPage = 0;
    Airing.data = {};
    Airing.seasons = ['Winter', 'Spring', 'Summer', 'Fall'];
    Airing.pages = 0;

    /**
     * @type {Nani}
     */
    Airing.nani = Nani.init(...this.bot.apiKeys.anilist);
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'anime';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'airing';
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
    const season = Airing.seasons[moment().quarter() - 1];
    // noinspection JSUnresolvedFunction
    Airing.data = JSON.parse(await this.bot.redis.getAsync('airing:data'));

    let sortedData;

    if (Airing.data) {
      sortedData = Airing.data.filter(a => a['airing'])
        .sort((x, y) => x['airing']['countdown'] - y['airing']['countdown']);
    }

    if (!Airing.data || new Date(sortedData[0]['airing']['time']) <= new Date()) {
      const url = `browse/anime?season=${season}&status=currently%20airing&` +
        `full_page=true&type=TV&airing_data=true&sort=popularity-desc`;

      try {
        Airing.data = await Airing.getAnimeData(url);
      } catch (e) {
      }

      if (!Airing.data) {
        return this.execute(msg, this.bot._('c.airing.error.retrieval'));
      }

      // noinspection JSUnresolvedFunction
      await this.bot.redis.setAsync('airing:data', JSON.stringify(Airing.data));
    }

    const anime = args ? Airing.data.find(anime => Airing.findAnime(anime, args)) : null;

    if (anime) {
      return this.execute(msg, Airing.specificAnime(anime));
    }

    const m = await this.execute(msg, Airing.paginatedAnime(Airing.data));

    if (Airing.pages > 1) await m.addReaction('1⃣');
    if (Airing.pages >= 2) await m.addReaction('2⃣');
    if (Airing.pages >= 3) await m.addReaction('3⃣');
    if (Airing.pages >= 4) await m.addReaction('4⃣');
    if (Airing.pages >= 5) await m.addReaction('5⃣');
    if (Airing.pages === 6) await m.addReaction('6⃣');

    await m.addReaction('🚮');

    this.reactionButton(['1⃣', '2⃣', '3⃣', '4⃣', '🚮'], Airing.reactionAddResponder, null, m.id, 300000);

    let content;

    this.awaitMessage(msg => {
      content = msg.content.replace('a.', '');

      if (msg.content.startsWith('a.') &&
        Airing.data.find(anime => Airing.findAnime(anime, content))) {
        return true;
      }
    }, async () => {
      m.edit(Airing.specificAnime(Airing.data.find(anime => Airing.findAnime(anime, content))));

      this.bot.messageHandler.currentButtons.delete(m.id);

      try {
        await m.removeReactions();
      } catch (e) { }
    }, 300000);
  }

  /**
   * @param {Message} message
   * @param {string} emoji
   * @param {string} userID
   * @returns {Promise.<void>}
   */
  static async reactionAddResponder(message, emoji, userID) {
    const msg = await message.channel.getMessage(message.id);

    if (Airing.pages > 1 && emoji['name'] === '1⃣') {
      await msg.edit(Airing.paginatedAnime(Airing.data, 0));
      await msg.removeReaction('1⃣', userID);

      // noinspection JSUnusedAssignment
      Airing.currentPage = 0;
    } else if (Airing.pages >= 2 && emoji['name'] === '2⃣') {
      await msg.edit(Airing.paginatedAnime(Airing.data, 1));
      await msg.removeReaction('2⃣', userID);

      // noinspection JSUnusedAssignment
      Airing.currentPage = 1;
    } else if (Airing.pages >= 3 && emoji['name'] === '3⃣') {
      await msg.edit(Airing.paginatedAnime(Airing.data, 2));
      await msg.removeReaction('3⃣', userID);

      // noinspection JSUnusedAssignment
      Airing.currentPage = 2;
    } else if (Airing.pages >= 4 && emoji['name'] === '4⃣') {
      await msg.edit(Airing.paginatedAnime(Airing.data, 3));
      await msg.removeReaction('4⃣', userID);

      // noinspection JSUnusedAssignment
      Airing.currentPage = 3;
    } else if (Airing.pages >= 5 && emoji['name'] === '5⃣') {
      await msg.edit(Airing.paginatedAnime(Airing.data, 4));
      await msg.removeReaction('5⃣', userID);

      // noinspection JSUnusedAssignment
      Airing.currentPage = 4;
    } else if (Airing.pages === 6 && emoji['name'] === '6⃣') {
      await msg.edit(Airing.paginatedAnime(Airing.data, 5));
      await msg.removeReaction('6⃣', userID);

      // noinspection JSUnusedAssignment
      Airing.currentPage = 5;
    } else if (emoji['name'] === '🚮') {
      Airing.bot.messageHandler.currentButtons.delete(msg.id);

      await msg.delete();
    }
  }

  /**
   * @param {object} anime
   * @returns {object}
   */
  static specificAnime(anime) {
    return {
      content: '',
      embed: {
        title: anime['title_english'],
        url: `https://anilist.co/anime/${anime.id}`,
        color: 0x0055FF,
        thumbnail: {
          url: anime['image_url_lge'],
        },
        fields: [{
          name: this.bot._('label.average_rating'),
          value: `${anime['average_score']}/100`,
          inline: true,
        }, {
          name: this.bot._('label.alternate_titles'),
          value: `${anime['title_romaji']}\n${anime['title_japanese']}`,
          inline: true,
        }],
        footer: {
          text: `Episode ${anime['airing']['next_episode']} will air in about ${moment.duration(anime['airing']['countdown'] * 1000).humanize()}`,
        },
        timestamp: new Date(anime['airing']['time']),
      },
    };
  }

  /**
   * @param {string} url
   * @returns {Promise.<object>}
   */
  static async getAnimeData(url) {
    let data;

    try {
      data = await Airing.nani.get(url);
    } catch (e) {
      this.bot.capture('airing: ', e);

      return null;
    }

    return data;
  }

  /**
   * @param {object} anime
   * @param {string} args
   * @returns {boolean}
   */
  static findAnime(anime, args) {
    return new RegExp(args.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i').test(anime['title_english']);
  }

  /**
   * @param {Array} animeInfo
   * @param {number} page
   * @returns {string}
   */
  static paginatedAnime(animeInfo, page = 0) {
    const animeData = animeInfo.filter(a => a['airing'])
      .sort((x, y) => x['airing']['countdown'] - y['airing']['countdown'])
      .map((a, i) =>
        '[' + (i + 1) + ']: ' + a['title_english'] + ' | ' + moment.duration(a['airing']['countdown'] * 1000).humanize());
    const paginatedAnimeData = Airing.paginateArray(animeData);
    Airing.pages = paginatedAnimeData.length;
    return `${'```markdown'}
### Airing Anime for the ${Airing.seasons[moment().quarter() - 1]}: Page(${(page + 1) + '/' + Airing.pages}) ###
${paginatedAnimeData[page].join('\n')}
# Type 'a.' followed by the name of an anime for more detailed airing info #
# Example: 'a.beyond the boundary' #${'```'}`;
  }

  /**
   * @param {Array} array
   * @returns {Array}
   */
  static paginateArray(array) {
    let sets = [];
    let chunks = array.length / 10;

    for (let i = 0, j = 0; i < chunks; i += 1, j += 10) {
      sets[i] = array.slice(j, j + 10);
    }
    return sets;
  }
};
