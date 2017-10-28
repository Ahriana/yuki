const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const moment = require('moment');
const { Reminder } = require('../../db/models');
const { substrInstances } = require('../../utils');
const { calculateReminder } = require('./');

module.exports = class Remind extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'utilities';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'remind';
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
   * @returns {Promise.<void|Message>}
   */
  async process(msg, args) {
    const post = args.split(' ');
    const about = post.splice(1).join(' ');
    let inputTime = post[0];

    // moment.duration() parses `01:05` as "1 hour, 5 minutes". However, it
    // parses `00:01:05` as "1 minute, 5 seconds".
    //
    // If there is only one colon (`:`), insert a `00:` at the beginning to
    // force it to parse as minutes-and-seconds.
    if (substrInstances(inputTime, ':') === 1) {
      inputTime = `00:${inputTime}`;
    }

    const duration = moment.duration(inputTime);

    const timestamp = Date.now() + duration.asMilliseconds();
    const momentDuration = duration.humanize();

    let reminder;

    try {
      reminder = await Reminder.create({
        channel_id: msg.channel.id,
        content: about,
        reminded_for: new Date(timestamp),
        user_id: msg.author.id,
      });
    } catch (e) {
      this.bot.capture('remind: ', e);

      return this.execute(msg, this.bot._('c.remind.error.saving'));
    }

    let content;

    if (about.length > 0) {
      content = this.bot._('c.remind.with_note', {
        note: about,
        time: momentDuration,
      });
    } else {
      content = this.bot._('c.remind.without_note', {
        time: momentDuration,
      });
    }

    await this.execute(msg, content);

    await this.reminderClock(duration);

    reminder.destroy();

    try {
      await msg.channel.createMessage(calculateReminder(about, msg.author.id, this.bot.chisarok));
    } catch (e) {
    }
  }

  /** Resolve promise on reminder duration end
   *
   * @param {number} duration
   * @returns {Promise}
   */
  reminderClock(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
  }
};
