const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { guildPatronCheck, postGuildCount } = require('.');

module.exports = class GuildCreate extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'guildCreate';

    this.eventHandler = async guild => {
      if (guild.shard.ready) {
        postGuildCount(this.bot);
      }

      if (this.bot.yukiOptions.patron && this.bot.yukiOptions.patron.enabled) {
        let hasOwner = false;

        for (let owner of this.bot.yukiOptions.Owners) {
          if (guild.members.has(owner)) {
            hasOwner = true;
          }
        }

        if (!hasOwner) {
          try {
            guildPatronCheck(
              guild,
              this.bot.guilds.get(this.bot.yukiOptions.patron.guild_id),
              this.bot.yukiOptions.patron.role_id,
            );
          } catch (e) {
            this.bot.capture(e);
          }
        }
      }
    };
  }
};
