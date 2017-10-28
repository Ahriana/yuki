const Yuki = require('./Yuki');
const axios = require('axios');
const fs = require('fs');
const bluebird = require('bluebird');
const Chisarok = require('chisarok');
const redis = require('redis');
const yaml = require('js-yaml');

let options;

try {
  options = yaml.safeLoad(fs.readFileSync('./options.yml', 'utf8'));
} catch (e) {
  console.log(e);

  throw new Error('Error parsing options file');
}

/**
 * @typedef {Object} ApiKeys
 * @property {[string, string]} anilist
 * @property {string} darksky
 * @property {string} googleMaps
 * @property {string} googleTime
 * @property {string} imgur
 * @property {string} osu
 * @property {string} sentryURL
 * @property {[string, string]} webhook
 * @property {string} weebApi
 * @property {string} youtube
 */

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function initializeClient() {
  let response;

  try {
    response = await axios.get('https://discordapp.com/api/v6/gateway/bot', {
      headers: {
        Authorization: 'Bot ' + options['Token'],
      },
    });
  } catch (e) {
    console.log('Error getting gateway', e);
  }

  if (response) {
    options['Eris'].maxShards = response.data.shards;
  }

  /**
   * @type {Chisarok}
   */
  const chisarok = new Chisarok({
    defaultFallback: 'en',
    directory: `${__dirname}/../locales`,
  });
  await chisarok.load(yaml.safeLoad);

  const yuki = new Yuki(options, chisarok);
  await yuki.dataManager.populate();

  // noinspection JSUnresolvedFunction
  yuki.connect();
}

/**
 * Initialize the client
 */
initializeClient().catch(e => {
  console.log('Err initializing client', e);
});
