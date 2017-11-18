const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { postGuildCount } = require('.');

module.exports = class GuildCreate extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'guildCreate';

    this.eventHandler = async guild => {
      if (guild.shard.ready) {
        postGuildCount(this.bot);
      }
    };
  }
};
