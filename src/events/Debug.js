const BaseEvent = require('nagato/lib/Abstracts/BaseEvent');

module.exports = class Debug extends BaseEvent {
  constructor(bot) {
    super(bot);

    this.event = 'debug';

    /**
     * @param {Error} err
     * @returns {Promise.<void>}
     */
    this.eventHandler = async (msg, id) => {
      console.log('DEBUG', id, msg.toString());
    };
  }
};
