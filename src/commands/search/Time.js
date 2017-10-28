const axios = require('axios');
const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const moment = require('moment');

module.exports = class Time extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'search';
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'time';
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
    // noinspection JSUnresolvedFunction
    let location = JSON.parse(await this.bot.redis.getAsync(`google_locations_${args}`));

    if (!location) {
      let response;

      try {
        response = await this.getLocation(args);
      } catch (e) {
        this.bot['log'].warn(`Error getting location for: ${args}`, e);

        return this.execute(msg, this.bot._('c.time.error.location', {
          location: args,
        }));
      }
      location = response.data.results[0];

      location = {
        address: location['formatted_address'],
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng,
        place_id: location.place_id,
      };

      // noinspection JSUnresolvedFunction
      await this.bot.redis.setAsync(`google_locations:${args}`, JSON.stringify(location));
    }

    const lat = location.lat;
    const long = location.lng;

    const targetDate = new Date();
    const timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;

    // noinspection JSUnresolvedFunction
    let time = JSON.parse(await this.bot.redis.getAsync(`time_${location.place_id}`));

    if (!time) {
      let timeResponse;

      try {
        timeResponse = await this.getTime(lat, long, timestamp);
      } catch (e) {
        this.bot['log'].warn(`Error getting location for: ${args}`, e);

        return this.execute(msg, this.bot._('c.time.error.time', {
          input: args,
        }));
      }
      time = timeResponse.data;

      // noinspection JSUnresolvedFunction
      await this.bot.redis.setAsync(`time:${location.place_id}`, JSON.stringify(time));
    }

    const offset = time['dstOffset'] * 1000 + time['rawOffset'] * 1000;
    const currentTime = moment(timestamp * 1000 + offset);

    return this.execute(msg, {
      embed: {
        color: 0xFF7F50,
        title: location.address,
        description: this.bot._('c.time.result', {
          time: currentTime.format('dddd, MMMM Do YYYY, h:mm:ss a'),
        }),
      },
    });
  }

  /**
   * @param {string} locationName
   * @returns {Promise.<object>}
   */
  async getLocation(locationName) {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: locationName || 'Akihabara',
        key: this.bot.apiKeys.googleMaps,
      },
    });
  }

  /**
   * @param {string} lat
   * @param {string} long
   * @param {number} timestamp
   * @returns {Promise.<object>}
   */
  async getTime(lat, long, timestamp) {
    return axios.get('https://maps.googleapis.com/maps/api/timezone/json', {
      params: {
        location: `${lat}, ${long}`,
        key: this.bot.apiKeys.googleTime,
        timestamp: timestamp,
      },
    });
  }
};
