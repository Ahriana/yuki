const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const moment = require('moment');

module.exports = class Whois extends BaseCommand {
  constructor(bot) {
    super(bot);

    // noinspection JSUnusedGlobalSymbols
    this.dm = false;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'general';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'whois';
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
    const userID = this.bot.getUser(msg, args).id;
    // noinspection JSUnresolvedFunction
    const user = msg.channel.guild.members.get(userID);

    if (!user) {
      return this.execute(msg, this.bot._('c.whois.error.retrieval', {
        id: userID,
      }));
    }

    let colour;

    switch (user.status) {
      case 'idle':
        colour = 0xFAA61A;

        break;
      case 'dnd':
        colour = 0xF04747;

        break;
      case 'offline':
        colour = 0x747F8D;

        break;
      default:
        colour = 0x43B581;
    }

    return this.execute(msg, {
      embed: {
        author: {
          name: `${user.user.username}#${user.user.discriminator}`,
          url: user.user.staticAvatarURL,
        },
        thumbnail: {
          url: user.user.avatarURL,
        },
        color: colour,
        fields: [{
          name: this.bot._('c.whois.user_id'),
          value: user.id,
          inline: true,
        }, {
          name: this.bot._('discord.guild.nickname.singular'),
          value: user.nick ? user.nick : this.bot._('label.na'),
          inline: true,
        }, {
          name: this.bot._('c.whois.join_date'),
          value: `${moment(user.joinedAt).utc().format('MMM DD YYYY | HH:mm')} (*${moment(user.joinedAt).fromNow()}*)`,
          inline: true,
        }, {
          name: this.bot._('discord.user.game.playing'),
          value: user.game && user.game.name ? user.game.name : this.bot._('label.na'),
          inline: true,
        }, {
          name: this.bot._('c.whois.creation_date'),
          value: `${moment(user.user.createdAt).utc().format('MMM DD YYYY | HH:mm')} (*${moment(user.user.createdAt).fromNow()}*)`,
          inline: true,
        }, {
          name: this.bot._('label.status'),
          value: user.status,
          inline: true,
        }],
      },
    });
  }
};
