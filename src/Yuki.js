const DataManager = require('./data/DataManager');
const DatabaseMiddleware = require('./DatabaseMiddleware');
const Nagato = require('nagato');
const Raven = require('raven');
const Redis = require('redis');
const { helpCreator } = require('./utils');

module.exports = class Yuki extends Nagato {
  /**
   *
   * @param {object} options
   * @param {Chisarok} chisarok
   */
  constructor(options, chisarok) {
    super(options);

    /**
     * @type {object}
     */
    this.yukiOptions = options;

    /**
     * @type {DataManager}
     */
    this.dataManager = new DataManager;

    /**
     * @type {Chisarok}
     */
    this.chisarok = chisarok;

    /**
     * @type {Raven}
     */
    this.raven = Raven;

    this.raven.config(this.apiKeys.sentryURL, {
      captureUnhandledRejections: true,
    }).install();

    /**
     * @type {Redis}
     */
    this.redis = Redis.createClient({
      host: 'localhost',
      prefix: this.redisPrefix,
    });

    this.helpCreator = helpCreator;

    // noinspection JSIgnoredPromiseFromCall
    this.loadCommands(`${__dirname}/commands/`);
    // noinspection JSIgnoredPromiseFromCall
    this.loadEvents(`${__dirname}/events/`);

    this.loadMiddleware(DatabaseMiddleware);
  }

  get redisPrefix() {
    return this.yukiOptions.redis.prefix;
  }

  /**
   * @type {ApiKeys}
   */
  get apiKeys() {
    return this.yukiOptions.APIKeys;
  }

  _(key, bindings) {
    return this.chisarok._(key, bindings);
  }

  __(localeName, key, bindings) {
    return this.chisarok.__(localeName, key, bindings);
  }

  _m(...keys) {
    return this.chisarok._m(...keys);
  }

  /**
   * Captures an exception via Raven, notifying Sentry.
   *
   * @param {Error} e The error to capture via Raven.
   */
  capture(e) {
    this.raven.captureException(e);
  }

  /**
   * Sends a webhook if the webhook info is in the configuration.
   *
   * If the configuration is not set, returns a void promise.
   *
   * @param {Object} content - The webhook content to send.
   * @returns {Promise.<void>}
   */
  async sendWebhook(content) {
    if (!this.apiKeys || !this.apiKeys.webhook) {
      return;
    }

    return this.executeWebhook(this.apiKeys.webhook[0], this.apiKeys.webhook[1], content);
  }
};
