const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { webhookColour, WebhookStatus } = require('../utils');

module.exports = class Disconnect extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'disconnect';

    /**
     * @param {?Error} err
     * @returns {Promise.<void>}
     */
    this.eventHandler = async err => {
      try {
        await this.bot.sendWebhook({
          embeds: [{
            color: webhookColour(WebhookStatus.ERROR),
            description: err.toString().substring(0, 2048),
            timestamp: new Date(),
            title: 'Bot disconnected',
          }],
        });
      } catch (e) {
        this.bot.capture('disconnect: ', e);
      }

      throw 'Bot Disconnected';
    };
  }
};
