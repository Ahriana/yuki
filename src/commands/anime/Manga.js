const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Kitsu = require('kitsu');
const { defaultValue } = require('./');

const kitsu = new Kitsu();

module.exports = class Manga extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['m'];
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
    return 'manga';
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
    const input = args || 'The Melancholy of Haruhi Suzumiya';

    let results;

    try {
      results = await kitsu.searchManga(input);
    } catch (e) {
      this.bot.log.warn(`Failed to retrieve manga named: ${input}`, e);

      return this.execute(msg, this.bot._('c.manga.error.retrieval', {
        input,
      }));
    }

    if (results.length === 0) {
      return this.execute(msg, this.bot._('c.manga.no_result', {
        input,
      }));
    }

    const manga = results[0];

    let imageThumbnail;

    if (manga.images.posterImage) {
      imageThumbnail = manga.images.posterImage.original;
    }

    const footerDateRange = this.bot._('time.date_range', {
      from: manga.startDate || '????-??-??',
      to: manga.endDate || '????-??-??',
    });

    return this.execute(msg, {
      embed: {
        author: {
          name: manga.titles.canonical,
          url: manga.url,
        },
        color: 0x3952EE,
        thumbnail: {
          url: imageThumbnail,
        },
        description: manga.synopsis.length > 2043 ? manga.synopsis.substring(0, 2043) + '...' : manga.synopsis,
        fields: [{
          name: 'Type',
          value: manga.type ? manga.type.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : 'N/A',
          inline: true,
        }, {
          name: this.bot._('label.age_rating'),
          value: defaultValue(manga.ageRating),
          inline: true,
        }, {
          name: this.bot._('label.volume.plural_optional'),
          value: defaultValue(manga.volumeCount),
          inline: true,
        }, {
          name: this.bot._('label.chapters'),
          value: defaultValue(manga.chapterCount),
          inline: true,
        }, {
          name: this.bot._('label.rating'),
          value: `${manga['rating'] ? Math.round(manga['rating']) : '?'}/100`,
          inline: true,
        }, {
          name: this.bot._('label.popularity_rank'),
          value: defaultValue(manga.popularityRank),
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
