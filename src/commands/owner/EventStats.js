const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');

module.exports = class EventStats extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.eventCount = this.bot['eventCounter'].eventCount;

    // noinspection JSUnusedGlobalSymbols
    this.ownerOnly = true;
    this.aliases = ['es'];
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'owner';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'eventstats';
  }

  /**
   * @returns {string}
   */
  get help() {
    const [description, example, usage] = this.bot._m(
      `help.${this.name}.description`,
      `help.${this.name}.examples`,
      `help.${this.name}.usage`,
    );

    return this.bot.helpCreator(this, description, usage, example);
  }

  /**
   * @param {Message} msg
   * @param {string} args
   * @returns {Promise.<void>}
   */
  async process(msg, args) {
    let eventArray = [];
    let total = 0;

    if (!args || isNaN(args) || this.bot.shards.size - 1 < args) {
      this.eventCount.forEach(shardEvents => {
        shardEvents.forEach((value, event) => {
          if (!eventArray.some(e => e.event === event)) {
            eventArray.push({
              event: event,
              value: value,
            });
          } else {
            eventArray.find(e => e.event === event).value += value;
          }

          total += value;
        });
      });
    } else {
      this.eventCount[args].forEach((value, event) => {
        eventArray.push({
          event: event,
          value: value,
        });

        total += value;
      });
    }

    eventArray = eventArray
      .sort((a, b) => b.value - a.value)
      .map(e => `${e.event}: ${e.value}`)
      .join('\n');

    return this.execute(msg, `${'```'}swift\n${eventArray}\n\nTOTAL: ${total}${'```'}`);
  }
};
