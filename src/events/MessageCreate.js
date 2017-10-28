const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');

module.exports = class MessageCreate extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.tables = [
      '┬─┬﻿ ︵ /(.□. \\\\)',
      '┬─┬ノ( º _ ºノ)',
      '┬─┬﻿ ノ( ゜-゜ノ)',
      '┬─┬ ノ( ^_^ノ)',
      '┬──┬﻿ ¯\\\\_(ツ)',
      '(╯°□°）╯︵ /(.□. \\\\)',
    ];

    this.event = 'messageCreate';

    /**
     * @param {Message} message
     * @returns {Promise.<void>}
     */
    this.eventHandler = async message => {
      if (message.author.bot) {
        return;
      }

      // noinspection JSValidateTypes
      if (message.content !== '(╯°□°）╯︵ ┻━┻') {
        return;
      }

      if (!message.channel.guild) {
        return;
      }

      if (!message.channel.permissionsOf(this.bot.user.id).has('sendMessages')) {
        return;
      }

      let result;

      try {
        result = await this.bot.dataManager.guilds.findOrDefault(message.channel.guild.id);
      } catch (e) {
        this.bot.capture('messagecreate: ', e);

        return;
      }

      if (result && result.tableflip_enabled) {
        const table = this.tables[Math.floor(Math.random() * (this.tables.length))];

        try {
          await message.channel.createMessage(table);
        } catch (e) {
        }
      }
    };
  }
};
