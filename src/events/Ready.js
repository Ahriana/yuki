const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { webhookColour, WebhookStatus } = require('../utils');
const { calculateReminder } = require('../commands/utilities');
const { Reminder } = require('../db/models');
const { guildPatronCheck } = require('.');

module.exports = class Ready extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'ready';
    // noinspection JSUnusedGlobalSymbols
    this.once = true;

    this.statuses = [
      'with Haruhi Suzumiya',
      'with Itsuki Koizumi',
      'with Kyon',
      'with Mikuru Asahina',
      'with Ryoko Asakura',
      'with Tsuruya',
      'with Kunikida',
      'with Miyuki Enomoto',
      'with Takako Nakanishi',
      'with Mizuki Okajima',
      'with Mai Zaizen',
      'with Kimidori',
      'with Keiichi Tamaru',
      'with Yutaka Tamaru',
      'with Sonou Mori',
      'with Arakawa',
      'with Sasaki',
      'with Okabe',
      'with ENOZ',
      'God Knows',
      'Day of Sagittarius',
      'SOS Brigade',
      'Endless Eight',
      'Disappearence',
      'with meila',
      'with Karen',
      'with kittens',
    ];

    this.eventHandler = async () => {
      try {
        await this.bot.sendWebhook({
          embeds: [{
            color: webhookColour(WebhookStatus.SUCCESS),
            timestamp: new Date(),
            title: 'All shards ready',
          }],
        });
      } catch (e) {
        this.bot.capture('ready: ', e);
      }

      if (this.bot.yukiOptions.patron && this.bot.yukiOptions.patron.enabled) {
        for (let guild of this.bot.guilds.values()) {
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
                this.bot.yukiOptions.patron.role_ids,
              );
            } catch (e) {
              this.bot.capture(e);
            }
          }
        }
      }

      await this.setReminders();
      await this.rejoinVoiceConnections();
      this.rotateStatus();

      setInterval(() => this.rotateStatus(), 1000 * 60 * 15);
    };
  }

  async setReminders() {
    const reminders = await Reminder.findAll();
    const remind = this.bot['commands'].get('remind');

    reminders.forEach(async r => {
      const reminder = r.dataValues;
      const duration = new Date(reminder.reminded_for).valueOf() - ((Date.now() / 1000) | 0);

      await remind.reminderClock(duration);

      try {
        await r.destroy();
      } catch (e) {
        this.bot.capture('ready reminder destroy: ', e);
      }

      try {
        const content = calculateReminder(reminder.content, reminder.user_id, this.bot.chisarok);

        await this.bot.createMessage(reminder.channel_id, content);
      } catch (e) {
        this.bot.capture('ready reminder send: ', e);
      }
    });
  }

  async rejoinVoiceConnections() {
    const voiceConnections = await this.bot.redis.keysAsync(`${this.bot.redisPrefix}voice_connection:*`);
    let connections = [];

    for (const key of voiceConnections) {
      const connection = JSON.parse(await this.bot.redis.getAsync(key.replace(this.bot.redisPrefix, '')));

      connections.push({
        channelID: connection.channelID,
        guildID: key.split('voice_connection:')[1],
        key,
        listeners: connection.listeners,
      });
    }

    connections.sort((a, b) => a.listeners - b.listeners);

    for (const { channelID, guildID, key } of connections) {
      const guild = this.bot.guilds.get(guildID);

      if (!guild) {
        await this.bot.redis.delAsync(key);

        return;
      }

      const channel = guild.channels.get(channelID);

      if (!channel) {
        await this.bot.redis.delAsync(key);

        return;
      }

      try {
        await this.bot['commands'].get('listen').joinChannel(channelID, null);

        await this.bot['events']['voiceChannelLeave'].stopPlaying(null, channel);
      } catch (e) {
        this.bot['log'].warn('Err reconnecting to voice connection', e.stack);
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  rotateStatus() {
    const type = randomNumber(0, 3);

    if (type === 0) {
      const statusType = randomNumber(0, 5);

      switch (statusType) {
        case 0:
          this.bot.editStatus({
            name: `${this.bot.guilds.size} Guilds`,
            type: 0,
          });

          break;
        case 1:
          this.bot.editStatus({
            name: `${this.bot.shards.size} Shards`,
            type: 0,
          });

          break;
        case 2:
          this.bot.editStatus({
            name: `${Object.keys(this.bot.channelGuildMap).length} Channels`,
            type: 0,
          });

          break;
        case 3:
          this.bot.editStatus({
            type: 0,
            name: `${this.bot.users.size} Users`,
          });

          break;
        case 4:
          const days = `${Math.floor(this.bot['uptime'] / 86400000)}d`;
          const hours = `${Math.floor((this.bot['uptime'] / 3600000) % 24)}h`;
          const mins = `${Math.floor((this.bot['uptime'] / 60000) % 60)}m`;
          const secs = `${Math.floor((this.bot['uptime'] / 1000) % 60)}s`;

          const uptime = `${days}:${hours}:${mins}:${secs}`;

          this.bot.editStatus({
            name: uptime,
            type: 0,
          });
          break;
      }
    } else {
      this.bot.editStatus({
        name: this.statuses[Math.floor(Math.random() * this.statuses.length)],
        type: 0,
      });
    }
  }
};

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
