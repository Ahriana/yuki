const BlacklistManager = require('./BlacklistManager');
const GuildManager = require('./GuildManager');
const SharedStream = require('eris').SharedStream;

module.exports = class DataManager extends Map {
  constructor() {
    super();

    this.blacklists = new BlacklistManager();
    this.guilds = new GuildManager();
  }

  /**
   *
   * @returns {SharedStream}
   */
  get listenStream() {
    if (!this.has('listen')) {
      this.set('listen', {});
    }

    const listen = this.get('listen');

    if (!listen.sharedStream) {
      listen.sharedStream = new SharedStream();
    }

    return listen.sharedStream;
  }

  /**
   *
   * @param {SharedStream} sharedStream
   */
  set listenStream(sharedStream) {
    if (!this.has('listen')) {
      this.set('listen', {});
    }

    this.get('listen').sharedStream = sharedStream;
  }

  populate() {
    return Promise.all([
      this.blacklists.populate(),
      this.guilds.populate(),
    ]);
  }
};
