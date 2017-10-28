const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');
const { webhookColour, WebhookStatus } = require('../utils');

module.exports = class Warn extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'warn';

    /**
     * @param {Error} err
     * @returns {Promise.<void>}
     */
    this.eventHandler = async err => {
      try {
        await this.bot.sendWebhook({
          embeds: [{
            color: webhookColour(WebhookStatus.WARN),
            description: err.toString().substring(0, 2048),
            timestamp: new Date(),
            title: 'Bot warn',
          }],
        });
      } catch (e) {
        this.bot.capture('warn: ', e);
      }
    };
  }
};
