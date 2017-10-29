const DataManager = require('./data/DataManager');
const DatabaseMiddleware = require('./DatabaseMiddleware');
const Grpc = require('grpc');
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

    this._createImageServiceClient();
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
   * Shortcut for generating an image over the gRPC client to the image service,
   * returning a promise.
   *
   * @param {ImageGenerationRequest} req The request to send to the server.
   * @returns {Promise.<ImageGenerationResponse>} The response with the image.
   * @public
   */
  async generateImage(req) {
    return new Promise((resolve, reject) => {
      this.imageServiceClient.generateImage(req, (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
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

  /**
   * Creates a gRPC client to the image service server.
   *
   * @private
   */
  _createImageServiceClient() {
    this.imageService = Grpc.load(`${__dirname}/../proto/proto/messages.proto`);
    const { host, port } = this.yukiOptions.image_service;

    this.imageServiceClient = new this.imageService.ImageGenerator(
      `${host}:${port}`,
      Grpc.credentials.createInsecure(),
    );
  }
};
