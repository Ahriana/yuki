const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const SetPrefix = require('./SetPrefix');

module.exports = class Setting extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['settings'];
    // noinspection JSUnusedGlobalSymbols
    this.dm = false;
    // noinspection JSUnusedGlobalSymbols
    this.permissions = {
      'manageGuild': true,
    };
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'admin';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'setting';
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
    if (!args) {
      return this.execute(msg, this.bot._('c.setting.available_settings'));
    }

    const split = args.split(' ');
    const name = split[0];
    const arg = split.splice(1).join(' ');

    switch (name) {
      case 'channelmute':
        try {
          const muted = await this.bot['commands'].get('channelmute').set(msg, arg);
          const status = muted ? 'muted' : 'unmuted';
          const content = this.bot._(`c.channelmute.${status}`);

          return this.execute(msg, content);
        } catch (e) {
          this.bot.capture('setting channelmute: ', e);

          const content = this.bot._('c.channelmute.error.update');

          return this.execute(msg, content);
        }
      case 'leave':
        try {
          return this.bot['commands'].get('leave').set(msg, arg);
        } catch (e) {
          this.bot.capture('setting leave: ', e);
        }

        break;
      case 'prefix':
      case 'changeprefix':
      case 'setprefix':
        try {
          const isSet = await this.bot['commands'].get('setprefix').set(msg, arg);
          const content = SetPrefix.actionContent(isSet, arg);

          return this.execute(msg, content);
        } catch (e) {
          this.bot.capture('setting setprefix: ', e);

          const content = this.bot._('c.setprefix.error.update');

          return this.execute(msg, content);
        }
      case 'toggle':
        const command = arg.toLowerCase();

        if (!this.bot['commands'].has(command) && command !== 'toggle') {
          const content = this.bot._('c.toggle.error.untoggleable', {
            name: 'toggle',
          });

          return this.execute(msg, content);
        }

        try {
          const disabled = await this.bot['commands'].get('toggle').set(msg, command);
          const status = disabled ? 'disabled' : 'enabled';
          const content = this.bot._('c.toggle.toggled', {
            command,
            status,
          });

          return this.execute(msg, content);
        } catch (e) {
          this.bot.capture('setting toggle: ', e);

          const content = this.bot._('c.toggle.error.update');

          return this.execute(msg, content);
        }
      case 'tableflip':
      case 'toggletableflip':
        try {
          const content = await this.bot['commands'].get('tableflip').set(msg, arg);

          return this.execute(msg, content);
        } catch (e) {
          this.bot.capture('setting tableflip: ', e);

          const content = this.bot._('c.tableflip.error.update');

          return this.execute(msg, content);
        }
      case 'welcome':
        try {
          await this.bot['commands'].get('welcome').set(msg, arg);
        } catch (e) {
          this.bot.capture('setting welcome: ', e);
        }

        break;
      default:
        const unknown = this.bot._('c.setting.error.unknown_setting', {
          setting: name,
        });
        const available = this.bot._('c.setting.available_settings');
        const content = `${unknown}\n\n${available}`;

        return this.execute(msg, content);
    }
  }
};
