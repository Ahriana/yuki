const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const osu = require('node-osu');
const { Profile: ProfileModel } = require('../../db/models');

module.exports = class Osu extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.osu = new osu.Api(this.bot.apiKeys.osu, {
      completeScores: true,
      notFoundAsError: false,
    });
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
    return 'osu';
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
   * @param {args} args
   * @returns {Promise.<void|Message>}
   */
  async process(msg, args) {
    let search;

    if (!args) {
      let response;

      try {
        response = await ProfileModel.find({
          where: {
            user_id: msg.author.id,
          },
          attributes: ['osu'],
        });
      } catch (e) {
      }

      if (response && response.dataValues.osu) {
        search = response.dataValues.osu;
      } else {
        search = msg.author.username;
      }
    } else {
      search = args;
    }

    let user;

    try {
      user = await this.osu.getUser({
        u: search,
      });
    } catch (e) {
      this.bot['log'].warn(`Error getting osu user: ${e}`);

      return this.execute(msg, this.bot._('c.osu.error.retrieval', {
        search,
      }));
    }

    if (user.length === 0) {
      return this.execute(msg, this.bot._('c.osu.no_result', {
        search,
      }));
    }

    return this.execute(msg, {
      embed: {
        author: {
          name: this.bot._('c.osu.name', {
            name: user.name,
          }),
          url: `https://osu.ppy.sh/u/${user.id}`,
        },
        color: 0xFF66AA,
        thumbnail: {
          url: `http://a.ppy.sh/${user.id}`,
        },
        fields: [{
          name: this.bot._('c.osu.level'),
          value: user.level ? user.level : 'N/A',
          inline: true,
        }, {
          name: this.bot._('c.osu.accuracy'),
          value: user.accuracy ? `${parseFloat(user.accuracy).toFixed(2)}%` : 'N/A',
          inline: true,
        }, {
          name: this.bot._('c.osu.country_rank'),
          value: user.pp.countryRank === '1' && user.pp.raw === null ? 'N/A' : `#${Osu.numberWithCommas(user.pp.countryRank)}`,
          inline: true,
        }, {
          name: this.bot._('c.osu.global_rank'),
          value: user.pp.rank ? `#${Osu.numberWithCommas(user.pp.rank)}` : 'N/A',
          inline: true,
        }, {
          name: this.bot._('c.osu.pp'),
          value: user.pp.raw ? Osu.numberWithCommas(user.pp.raw) : 'N/A',
          inline: true,
        }, {
          name: this.bot._('c.osu.play_count'),
          value: user.counts.plays ? Osu.numberWithCommas(user.counts.plays) : 'N/A',
          inline: true,
        }],
        footer: {
          text: `Country: ${user.country ? user.country : 'N/A'}`,
        },
      },
    });
  }

  static numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
  }
};
