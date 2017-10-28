const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { webhookColour, WebhookStatus } = require('../utils');

module.exports = class Err extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'error';

    /**
     * @param {?Error} err
     * @returns {Promise.<void>}
     */
    this.eventHandler = async err => {
      if (err) {
        this.bot.capture('error: ', err);
        try {
          await this.bot.sendWebhook({
            embeds: [{
              color: webhookColour(WebhookStatus.ERROR),
              description: err.toString().substring(0, 2048),
              timestamp: new Date(),
              title: 'Bot error',
            }],
          });
        } catch (e) {
          this.bot.capture('error: ', e);
        }
      }
    };
  }
};
