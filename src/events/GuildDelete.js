const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { postGuildCount } = require('.');

module.exports = class GuildDelete extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'guildDelete';

    this.eventHandler = async guild => {
      if (guild.shard.ready) {
        postGuildCount(this.bot);
      }
    };
  }
};
