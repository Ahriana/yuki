const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const Kitsu = require('kitsu');

const kitsu = new Kitsu();

module.exports = class Character extends BaseCommand {
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
    return 'character';
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
    const input = args || 'Haruhi Suzumiya';

    let results;

    try {
      results = await kitsu.searchCharacters(input);
    } catch (e) {
      this.bot.log.warn(`Failed to retrieve character: ${input}`, e);

      return this.execute(msg, this.bot._('c.character.error.retrieval', {
        input,
      }));
    }

    if (results.length === 0) {
      return this.execute(msg, this.bot._('c.character.no_result', {
        input,
      }));
    }

    const character = results[0];

    let description = '';

    if (character.description) {
      description = character.description
        .replace(/<br ?\/?>/g, '\n')
        .replace(/\r?\n|\r/g, '\n')
        .replace(/<em>|<\/em>/g, '*')
        .replace(/\[(i|\/i)]/g, '*')
        .replace(/\[(b|\/b)]/g, '**')
        .replace(/(<([^>]+)>)/ig, '');
    }

    let imageThumbnail;

    if (character.images) {
      imageThumbnail = character.images.original;
    }

    return this.execute(msg, {
      embed: {
        author: {
          name: character.name,
          url: character.malURL,
        },
        color: 0xE31993,
        thumbnail: {
          url: imageThumbnail,
        },
        description: description.length > 2043 ? description.substring(0, 2043) + '...' : description,
      },
    });
  }
};
