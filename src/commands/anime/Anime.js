const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Kitsu = require('kitsu');
const { defaultValue } = require('./');

const kitsu = new Kitsu();

module.exports = class Anime extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['a'];
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
    return 'anime';
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
   * @param {String} args
   * @returns {Promise.<void|Message>}
   */
  async process(msg, args) {
    const input = args || 'The Melancholy of Haruhi Suzumiya';

    let results;

    try {
      results = await kitsu.searchAnime(input);
    } catch (e) {
      this.bot.capture('anime: ', e);

      return this.execute(msg, this.bot._('c.anime.error.searching', {
        input,
      }));
    }

    if (results.length === 0) {
      return this.execute(msg, this.bot._('c.anime.no_results', {
        input,
      }));
    }

    const anime = results[0];

    let imageThumbnail;

    if (anime.images.posterImage) {
      imageThumbnail = anime.images.posterImage.original;
    }

    const footerDateRange = this.bot._('time.date_range', {
      from: anime.startDate || '????-??-??',
      to: anime.endDate || '????-??-??',
    });

    return this.execute(msg, {
      embed: {
        author: {
          name: anime.titles.canonical,
          url: anime.url,
        },
        color: 0xff6700,
        thumbnail: {
          url: imageThumbnail,
        },
        description: anime.synopsis.length > 2045 ? anime.synopsis.substring(0, 2045) + '...' : anime.synopsis,
        fields: [{
          name: this.bot._('label.type'),
          value: anime.type,
          inline: true,
        }, {
          name: this.bot._('label.age_rating'),
          value: defaultValue(anime.ageRating),
          inline: true,
        }, {
          name: this.bot._('label.episodes.plural_optional'),
          value: defaultValue(anime.episodeCount),
          inline: true,
        }, {
          name: this.bot._('label.episode_length'),
          value: defaultValue(anime.episodeLength),
          inline: true,
        }, {
          name: this.bot._('label.rating'),
          value: `${anime['rating'] ? Math.round(anime['rating']) : '?'}/100`,
          inline: true,
        }, {
          name: this.bot._('label.popularity_rank'),
          value: defaultValue(anime.popularityRank),
          inline: true,
        }],
        footer: {
          text: footerDateRange,
          icon_url: 'http://i.imgur.com/taRJXqB.png',
        },
      },
    });
  }
};
