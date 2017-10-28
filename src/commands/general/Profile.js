const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { Profile: ProfileModel } = require('../../db/models');

const moment = require('moment');

module.exports = class Profile extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'general';
  }

  get name() {
    return 'profile';
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

  static get keyName() {
    return {
      'anime_planet': '🔖 Anime Planet',
      'age': '🎂 Age',
      'birthday': '🎉 Birthday',
      'kitsu': '📘 Kitsu',
      'location': '🌎 Location',
      'myanimelist': '📕 MyAnimeList',
      'name': '📝 Name',
      'osu': '🎮 Osu',
      'status': '✒️ Status',
    };
  }

  static get defaultKeys() {
    return ['user_id', 'createdAt', 'updatedAt', 'id'];
  }

  static get keys() {
    return [
      'bio',
      'colour',
      'color',
      'icon',
      'avatar',
      'age',
      'birthday',
      'animeplanet',
      'myanimelist',
      'name',
      'osu',
      'status',
      'location',
      'country',
    ];
  }

  /**
   * @param {Message} msg
   * @param {string} args
   * @returns {Promise.<void|Message>}
   */
  async process(msg, args) {
    if (args) {
      const input = args.replace('edit ', '');
      const key = input.split(' ')[0];

      if (Profile.keys.includes(key)) {
        const profile = await this.findProfile(msg.author);
        const value = input.split(' ').splice(1).join(' ');

        const content = await this.editProfile(profile, key, value);

        return this.execute(msg, content);
      }
    }

    const user = this.bot.getUser(msg, args);
    const profile = await this.findProfile(user);

    return this.execute(msg, this.displayProfile(user, profile));
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @param {User} user
   * @returns {Promise.<ProfileModel>}
   */
  async findProfile(user) {
    let result;

    try {
      [result] = await ProfileModel.findOrCreate({
        where: {
          user_id: user.id,
        },
        defaults: {
          name: user.username,
          user_id: user.id,
        },
      });
    } catch (e) {
      console.log(e);
    }

    return result;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @param {Profile} profile
   * @param {string} key
   * @param {string} value
   * @returns {Promise.<string>}
   */
  async editProfile(profile, key, value) {
    switch (key) {
      case 'bio':
        if (!value) {
          profile.bio = null;
        } else if (value.length > 1024) {
          return '`bio` has a max length of 1024 characters.';
        } else {
          profile.bio = value;
        }

        break;
      case 'colour':
      case 'color':
        const isHex = /^#?[0-9A-F]{6}$/i.test(value);

        if (!value) {
          profile.colour = null;
        } else if (isHex) {
          value = value.replace('#', '');

          profile.colour = parseInt(value, 16);
        } else {
          return `\`${value}\` is not a valid hex colour code, an example of a` +
            ` valid hex code is \`#BA2CBA\`.`;
        }

        break;
      case 'icon':
      case 'avatar':
        if (!value) {
          profile.icon = null;
        } else {
          let message;

          try {
            message = await this.bot.createMessage('339503630732492800', {
              embed: {
                thumbnail: {
                  url: value,
                },
              },
            });
          } catch (e) {
            this.bot.capture('profile: ', e);

            return `\`${value}\` is not a valid thumbnail, an example of a valid` +
              ` thumbnail is \`https://i.imgur.com/ifZeVPE.jpg\`.`;
          }

          await message.delete();

          profile.icon = value;
        }

        break;
      case 'age':
        if (!value) {
          profile.age = null;
        } else if (value.length > 4) {
          return '`age` has a max length of 4 characters.';
        } else if (!parseInt(value, 10)) {
          return `\`${value}\` is not a valid age, an example of a valid age is ` +
            `\`21\`.`;
        } else {
          profile.age = parseInt(value, 10);
        }

        break;
      case 'birthday':
        if (!value) {
          profile.birthday = null;
        } else if (moment(value, 'YYYY-MM-DD', true).isValid()) {
          profile.birthday = moment(value);
        } else {
          return `\`${value}\` is not a valid date, an example of a valid date is ` +
            `\`2017-03-10\` in \`YYYY-MM-DD\` format.`;
        }

        break;
      case 'location':
      case 'country':
        if (!value) {
          profile.location = null;
        } else if (!Profile.flagCheck(value) || !/[\uD000-\uF8FF]/g.test(value)) {
          return `\`${value}\` is not a valid flag, an example of a valid flag is 🇨🇦.`;
        } else {
          profile.location = value;
        }

        break;
      case 'animeplanet':
      case 'kitsu':
      case 'myanimelist':
      case 'name':
      case 'osu':
        if (value.length > 32) {
          return `\`${key}\` has a max length of 32 characters.`;
        } else {
          let prop = key;

          if (key === 'animeplanet') {
            prop = 'anime_planet';
          }

          if (!value) {
            profile[prop] = null;
          } else {
            profile[prop] = value;
          }
        }

        break;
      case 'status':
        if (!value) {
          profile.status = null;
        } else if (value.length > 64) {
          return '`status` has a max length of 64 characters.';
        } else {
          profile.status = value;
        }

        break;
    }

    await profile.save();

    let content;

    if (!value) {
      content = `Successfully cleared \`${key}\` from your profile.`;
    } else {
      content = `Successfully set \`${key}\` to the passed value.`;
    }

    return content;
  }

  /**
   * @param {User} user
   * @param {ProfileModel} profile
   * @returns object
   */
  displayProfile(user, profile) {
    let embed = {
      author: {
        name: `${user.username}'s Profile`,
        icon_url: user.avatarURL,
      },
      color: 0xD675D6,
      description: null,
      fields: [],
      thumbnail: null,
    };

    for (let [key, value] of Object.entries(profile['dataValues'])) {
      if (value === null || Profile.defaultKeys.includes(key)) {
        // noinspection UnnecessaryContinueJS
        continue;
      } else if (key === 'bio') {
        embed.description = value;
      } else if (key === 'colour') {
        embed.color = value;
      } else if (key === 'icon') {
        embed.thumbnail = {
          url: value,
        };
      } else if (key === 'birthday') {
        const date = moment(value);

        embed.fields.push({
          name: Profile.keyName[key],
          value: date.format('LL'),
          inline: true,
        });
      } else {
        embed.fields.push({
          name: Profile.keyName[key],
          value: value,
          inline: true,
        });
      }
    }

    return {
      embed,
    };
  }

  /**
   * @param flag
   * @returns {boolean}
   */
  static flagCheck(flag) {
    const converted = String.fromCharCode(...[...flag].map(c => c.codePointAt(0) - 127397));

    return /^[A-Z]{2}$/.test(converted.toUpperCase());
  }
};
