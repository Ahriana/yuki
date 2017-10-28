const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { webhookColour, WebhookStatus } = require('../utils');

module.exports = class ShardResume extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'shardResume';

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
            title: `Shard ${id} resumed`,
          }],
        });
      } catch (e) {
        this.bot.capture('shardresume', e);
      }
    };
  }
};
