const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { webhookColour, WebhookStatus } = require('../utils');

module.exports = class ShardDisconnect extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'shardDisconnect';

    /**
     * @param {?Error} err
     * @param {number} id
     * @returns {Promise.<void>}
     */
    this.eventHandler = async (err, id) => {
      let content = null;

      if (err && err.hasOwnProperty('toString')) {
        content = err.toString().substring(0, 2048);
      }

      try {
        await this.bot.sendWebhook({
          embeds: [{
            color: webhookColour(WebhookStatus.ERROR),
            description: content,
            timestamp: new Date(),
            title: `Shard ${id} disconnected`,
          }],
        });
      } catch (e) {
        this.bot.capture('sharddisconnect: ', e);
      }
    };
  }
};
