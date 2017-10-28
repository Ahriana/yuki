const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { helpCreator } = require('../../utils');
const { UnknownTagError } = require('./errors');
const { TagRequestData, getTag } = require('./');

module.exports = class TagInfo extends BaseCommand {
  constructor(bot) {
    super(bot);

    /**
     * @type {Array.<string>}
     */
    this.aliases = ['chaninfo'];
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'tags';
  }

  get help() {
    const [description, example, usage] = this.bot._m(
      `help.tag.info.description`,
      `help.tag.info.examples`,
      `help.tag.info.usage`,
    );

    return this.bot.helpCreator(this, description, usage, example);
  }

  get name() {
    return 'taginfo';
  }

  /**
   * @param {Message} msg
   * @param {string} args
   * @returns {Promise.<void>}
   */
  async process(msg, args) {
    const request = new TagRequestData(
      msg.channel.guild,
      msg.author.id,
      args.split(' '),
      this.bot.users,
      this.bot.chisarok,
    );
    const content = await this.messageable(request);

    return this.execute(msg, content);
  }

  /**
   * Returns content representing a tag, or a failure when retrieving the tag.
   *
   * This never rejects.
   *
   * @param {TagRequestData} request
   * @returns {Promise.<string>}
   */
  async messageable(request) {
    const name = request.subcommandArgs[0];

    if (!name) {
      const [description, example, usage] = request.chisarok._m(
        `help.tag.info.description`,
        `help.tag.info.examples`,
        `help.tag.info.usage`,
      );

      return helpCreator('tag info', description, usage, example);
    }

    try {
      const tag = await getTag(request.guild.id, name);

      return tag.format(request.users);
    } catch (e) {
      if (e instanceof UnknownTagError) {
        return e.toString(request.chisarok);
      } else {
        this.bot.capture('taginfo: ', e);

        return request.chisarok._('c.tag.info.error.retrieval');
      }
    }
  }
};
