const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const { messageableCreateTag } = require('./create_tag');
const { messageableDeleteTag } = require('./delete_tag');
const { messageableEditTag } = require('./edit_tag');
const { messageableGetTag } = require('./get_tag');
const { messageableListTags } = require('./list_tags');
const { TagRequestData } = require('./');

module.exports = class Tag extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['chan'];
  }

  /**
   * @returns {
   *   {
   *     create: messageableCreateTag,
   *     delete: messageableDeleteTag,
   *     edit: messageableEditTag,
   *     get: messageableGetTag,
   *     info: TagInfo.messageable,
   *     list: messageableListTags,
   *     : messageableListTags
   *   }
   * }
   */
  get actions() {
    return {
      'create': messageableCreateTag,
      'delete': messageableDeleteTag,
      'edit': messageableEditTag,
      'get': messageableGetTag,
      'info': this.bot['commands'].get('taginfo').messageable,
      'list': messageableListTags,
      '': messageableListTags,
    };
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'tags';
  }

  /**
   * @returns {string}
   */
  get help() {
    const [description, example, usage] = this.bot._m(
      `help.tag.all.description`,
      `help.tag.all.examples`,
      `help.tag.all.usage`,
    );

    return this.bot.helpCreator(this, description, usage, example);
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'tag';
  }

  async process(msg, args) {
    const split = args.split(' ');
    const subcommand = split[0];
    const subcommandArgs = split.splice(1);

    // Create an instance of a class which just holds data that can be accessed
    // by all of the sub-command handlers.
    let tagRequestData = new TagRequestData(
      msg.channel.guild,
      msg.author.id,
      subcommandArgs,
      this.bot.users,
      this.bot.chisarok,
    );

    // Here's where a bit of magic happens:
    //
    // `Tag.actions` returns an object, keyed by the possible subcommands. These
    // keys are mapped to values, which are pointers to the actual subcommand
    // handlers.
    //
    // For example, `Tag.actions['delete']` returns a pointer to the
    // `messageableDeleteTag` function. We assign this to `functionPtr`.
    //
    // Tags support retrieving a tag by name without the `get` subcommand, so
    // both of these are acceptable:
    //
    // - `yuki tag get some-meme`
    // - `yuki tag some-meme`
    //
    // If someone uses `get`, the `subcommand` variable is set to a value of
    // `get`, so a function pointer will be appropriately retrieved from the
    // `actions` object. If someone uses the shortcut, it will be undefined. To
    // account for this, if `functionPtr` is undefined we default it to
    // `messageableGetTag`.
    let functionPtr = this.actions[subcommand];

    // If a function pointer isn't mapped for the subcommand (e.g. in the case
    // of someone using the shortcut tag retrievla usage), then default to
    // retrieving a tag.
    if (!functionPtr) {
      // Since the subcommand is actually "get" and not the user using a
      // shortcut to retrieving a tag, we need to set the subcommand to "get"
      // and push the value to the beginning of subcommandArgs.
      tagRequestData.subcommandArgs.splice(0, 0, subcommand);
      tagRequestData.subcommand = 'get';

      // Now we can set the functionPtr to its actual value.
      functionPtr = messageableGetTag;
    }

    // Lastly, call the function pointer and provide it the information it needs
    // to operate.
    const content = await functionPtr(tagRequestData);

    return this.execute(msg, content);
  }
};
