const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { webhookColour, WebhookStatus } = require('../utils');

module.exports = class ShardReady extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'shardReady';

    /**
     * @param {number} id
     * @returns {Promise.<void>}
     */
    this.eventHandler = async id => {
      try {
        await this.bot.sendWebhook({
          embeds: [{
            color: webhookColour(WebhookStatus.SUCCESS),
            timestamp: new Date(),
            title: `Shard ${id} ready`,
          }],
        });
      } catch (e) {
        this.bot.capture('shardready', e);
      }
    };
  }
};
