const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const WebSocket = require('ws');

/**
 * @typedef {Object} RadioInfo
 * @property {?string} anime_name
 * @property {?string} artist_name
 * @property {?string} requested_by
 * @property {?string} second_last
 * @property {?string} song_name
 */

module.exports = class NowPlaying extends BaseCommand {
  constructor(bot) {
    super(bot);

    this.aliases = ['np'];

    /**
     * @type {?EventEmitter}
     */
    this.ws = null;

    /**
     * @type {?RadioInfo}
     */
    this.radioJSON = null;

    /**
     * @type ?WebSocket
     */
    this.connectWS();
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'radio';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'nowplaying';
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
   * @returns {Promise.<void>}
   */
  async process(msg) {
    return this.execute(msg, {
      embed: {
        color: 0xec1a55,
        author: {
          name: this.bot._('c.nowplaying.info'),
          url: 'https://listen.moe/',
        },
        thumbnail: {
          url: 'http://i.imgur.com/9X7pmfk.jpg',
        },
        fields: [{
          name: this.bot._('c.nowplaying.current'),
          value: this.getOrDefault(this.radioJSON.song_name),
          inline: true,
        }, {
          name: this.bot._('c.nowplaying.anime'),
          value: this.getOrDefault(this.radioJSON.anime_name),
          inline: true,
        }, {
          name: this.bot._('c.nowplaying.artist'),
          value: this.getOrDefault(this.radioJSON.artist_name),
          inline: true,
        }, {
          name: this.bot._('c.nowplaying.requested'),
          value: this.getOrDefault(this.radioJSON.requested_by),
          inline: true,
        }, {
          name: this.bot._('c.nowplaying.previous'),
          value: this.getOrDefault(this.radioJSON.last.song_name),
          inline: true,
        }, {
          name: this.bot._('c.nowplaying.prior'),
          value: this.getOrDefault(this.radioJSON.second_last.song_name),
          inline: true,
        }],
        timestamp: new Date(),
        footer: {
          text: this.bot._('c.nowplaying.listeners', {
            listeners: this.radioJSON.listeners,
          }),
        },
      },
    });
  }

  connectWS() {
    if (this.ws) {
      this.ws.removeAllListeners();
    }

    try {
      this.ws = new WebSocket('https://listen.moe/api/v2/socket');
    } catch (error) {
      this.bot.capture('nowplaying: ', error);

      setTimeout(() => this.connectWS(), 3000);
    }

    this.ws.onerror = this._handleError.bind(this);
    this.ws.on('message', this._handleMessage.bind(this));
    this.ws.on('close', this._handleClose.bind(this));
  }

  /**
   * Returns the input - truncated to 1024 characters - or returns a default of
   * 'N/A'.
   *
   * @arg {String} value - The input to truncate or default.
   * @returns {String} The truncated or defaulted string.
   * @private
   */
  getOrDefault(value) {
    return value ? value.substring(0, 1024) : this.bot._('c.nowplaying.none');
  }

  _handleClose() {
    console.log('close');
    this.bot['log'].warn('Listen.moe data socket closed');

    this.ws.terminate();

    setTimeout(() => this.connectWS(), 3000);
  }

  _handleError(err) {
    this.bot.capture('nowplaying: ', err);

    this.ws.terminate();
  }

  _handleMessage(data) {
    try {
      if (data) {
        this.radioJSON = JSON.parse(data);
      }
    } catch (e) {
      this.bot.capture('nowplaying: ', e);
    }
  }
};
