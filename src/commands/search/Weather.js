const BaseCommand = require('nagato/lib/Abstracts/BaseCommand');
const axios = require('axios');
const moment = require('moment');

/**
 * @typedef {Object} Location
 * @property {string} address - A human-readable representation of the
 * address.
 * @property {Geometry} geometry - A precise definition of the location.
 */

/**
 * @typedef {Object} Geometry
 * @property {GeometryLocation} location
 */

/**
 * @typedef {Object} GeometryLocation
 * @property {string} lat - The latitude of the location.
 * @property {string} lng - The longitude of the location.
 */

/**
 * @typedef {Object} Weather
 * @property {WeatherData} data
 */

/**
 * @typedef {Object} WeatherData
 * @property {number} apparentTemperature
 * @property {WeatherCurrently} currently
 * @property {WeatherDaily} daily
 * @property {number} offset
 * @property {number} precipProbability
 * @property {number} precipIntensity
 * @property {number} temperature
 */

/**
 * @typedef {Object} WeatherCurrently
 * @property {string} summary - A readable representation of the summary.
 * @property {number} time - The unix timestamp of the current forecast.
 */

/**
 * @typedef {Object} WeatherDaily
 * @property {WeatherDay[]} data
 * @property {string} icon
 */

/**
 * @typedef {Object} WeatherDay
 * @property {number} precipProbability
 * @property {number} temperatureMax
 * @property {number} temperatureMin
 * @property {number} time
 */

/**
 * @typedef {Object} SummaryView
 * @property {SummaryEmbed} embed
 */

/**
 * @typedef {Object} SummaryEmbed
 * @property {number} color
 * @property {Object[]} fields
 * @property {WeatherEmbedFooter} footer
 * @property {WeatherEmbedThumbnail} thumbnail
 * @property {Date} timestamp
 * @property {string} title
 */

/**
 * @typedef {Object} WeatherEmbedFooter
 * @property {string} text
 */

/**
 * @typedef {Object} WeatherEmbedThumbnail
 * @property {string} url
 */

/**
 * @typedef {Object} DetailedView
 * @property {DetailedEmbed} embed
 */

/**
 * @typedef {Object} DetailedEmbed
 * @property {number} color
 * @property {WeatherEmbedFooter} footer
 * @property {WeatherEmbedThumbnail} thumbnail
 * @property {number|Moment} timestamp
 * @property {string} title
 */

module.exports = class Weather extends BaseCommand {
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
    return 'weather';
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
   * Returns an object of icon names mapped to their colour.
   *
   * @const
   * @returns {object} The mapped object.
   * @static
   */
  static get colours() {
    return {
      'clear-day': 0xFFAC33,
      'clear-night': 0x000000,
      'rain': 0x5DADEC,
      'snow': 0x88C9F9,
      'sleet': 0x5DADEC,
      'wind': 0x8D9498,
      'fog': 0xCCD6DD,
      'cloudy': 0xCCD6DD,
      'partly-cloudy-day': 0xCCD6DD,
      'partly-cloudy-night': 0xCCD6DD,
    };
  }

  /**
   * @param {Message} msg
   * @param {string} args
   * @returns {Promise.<void|Message>}
   */
  async process(msg, args) {
    // noinspection JSUnresolvedFunction
    let location = JSON.parse(await this.bot.redis.getAsync(`google_locations:${args}`));

    if (!location) {
      let response;

      try {
        response = await Weather.getLocation(args, this.bot.apiKeys);
      } catch (e) {
        this.bot.log.warn(`Error getting location for: ${args}`, e);

        return this.execute(msg, this.bot._('c.weather.error.location', {
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
    const url = `https://api.darksky.net/forecast/${this.bot.apiKeys.darksky}/${lat},${long}`;

    // noinspection JSUnresolvedFunction
    /**
     * @type Weather
     */
    let weather = JSON.parse(await this.bot.redis.getAsync(`weather:${location.place_id}`));

    if (!weather) {
      let response;

      try {
        response = await axios.get(url, {
          params: {
            exclude: 'minutely,hourly,alerts,flags',
            units: 'ca',
          },
        });
      } catch (e) {
        this.bot['log'].warn(`Error getting weather for: ${lat},${long}`, e);

        return this.execute(msg, this.bot._('c.weather.error.weather', {
          location: args,
        }));
      }
      weather = response.data;

      // noinspection JSUnresolvedFunction
      await this.bot.redis.setAsync(`weather:${location.place_id}`, JSON.stringify(weather), 'EX', 3600);
    }

    const m = await this.execute(msg, Weather.summaryView(weather, location.address, this));

    let summaryView = true;

    await m.addReaction('📆');

    await this.reactionButton(['📆'], (msg, emoji) => {
      if (emoji.name === '📆') {
        const func = summaryView ? Weather.detailedView : Weather.summaryView;
        // noinspection JSIgnoredPromiseFromCall
        m.edit(func(weather, location.address, this));

        summaryView = !summaryView;
      }
    }, (msg, emoji) => {
      if (emoji.name === '📆') {
        const func = summaryView ? Weather.detailedView : Weather.summaryView;
        // noinspection JSIgnoredPromiseFromCall
        m.edit(func(weather, location.address, this));

        summaryView = !summaryView;
      }
    }, m.id, 300000);

    await m.removeReactions();
  }

  /**
   * @param {WeatherData} weatherInfo
   * @param {string} location
   * @param {Weather} classInstance
   * @returns {SummaryView}
   */
  static summaryView(weatherInfo, location, classInstance) {
    const info = weatherInfo.currently;
    const iconAndColour = Weather.getIconAndColour(info.icon);
    const temperatureC = Math.round(info.temperature);
    const temperatureF = Math.round(Weather.cToF(info.temperature));
    const precipProbability = info.precipProbability * 100;
    const apparentC = Math.round(info.apparentTemperature);
    const apparentF = Math.round(Weather.cToF(info.apparentTemperature));
    const precipIntensityMm = Math.round(info.precipIntensity);
    const precipIntensityIn = Math.round(info.precipProbability / 25.4);

    return {
      embed: {
        color: iconAndColour.colour,
        fields: [{
          name: classInstance.bot._('c.weather.summary'),
          value: info.summary,
        }, {
          name: classInstance.bot._('c.weather.temp'),
          value: `${temperatureC}°C / ${temperatureF}°F`,
          inline: true,
        }, {
          name: classInstance.bot._('c.weather.precip_prob'),
          value: `${precipProbability}%`,
          inline: true,
        }, {
          name: classInstance.bot._('c.weather.feels'),
          value: `${apparentC}°C / ${apparentF}°F`,
          inline: true,
        }, {
          name: classInstance.bot._('c.weather.precip_inten'),
          value: `${precipIntensityMm}mm/hr / ${precipIntensityIn}inches/hr`,
          inline: true,
        }],
        footer: {
          text: classInstance.bot._('c.weather.footer'),
        },
        thumbnail: {
          url: iconAndColour.url,
        },
        timestamp: new Date(info.time * 1000),
        title: location,
      },
    };
  }

  /**
   * @param {WeatherData} weatherInfo
   * @param {string} location
   * @param {Weather} classInstance
   * @returns {DetailedView}
   */
  static detailedView(weatherInfo, location, classInstance) {
    const iconAndColour = Weather.getIconAndColour(weatherInfo.daily.icon);

    let embed = {
      color: iconAndColour.colour,
      footer: {
        text: classInstance.bot._('c.weather.footer'),
      },
      thumbnail: {
        url: iconAndColour.url,
      },
      timestamp: moment(weatherInfo.currently.time * 1000).utcOffset(weatherInfo.offset),
      title: location,
    };

    embed.fields = weatherInfo.daily.data.map(day => {
      return {
        name: moment(day.time * 1000).utcOffset(weatherInfo.offset).format('dddd'),
        value: Weather.formatDay(Weather.dayInfo(day), classInstance),
        inline: true,
      };
    });

    return {
      embed,
    };
  }

  /**
   * Converts a temperature in Celsius to its equivalent in Fahrenheit.
   *
   * @arg {number} celsius - The temperature to convert.
   * @returns {number} The temperature in Fahrenheit.
   * @private
   */
  static cToF(celsius) {
    return celsius * 1.8 + 32;
  }

  /**
   * Returns calculated information about various details of a day.
   *
   * @arg {object} day - Information for the day given from the DarkSky API.
   * @returns {object} Calculated object of key/values.
   * @private
   */
  static dayInfo(day) {
    return {
      temperatureMaxC: Math.round(day.temperatureMax),
      temperatureMaxF: Math.round(this.cToF(day.temperatureMax)),
      temperatureMinC: Math.round(day.temperatureMin),
      temperatureMinF: Math.round(this.cToF(day.temperatureMin)),
      precipProbability: Math.round(day.precipProbability * 100),
    };
  }

  /**
   * Generates a formatted string containing information of the weather for
   * the given day.
   *
   * Lists the information about the day returned from the `dayInfo` method.
   *
   * @param {object} info - Information returned by the `dayInfo` method.
   * @param {Weather} classInstance
   * @returns {string} The formatted string containing the provided info.
   * @private
   */
  static formatDay(info, classInstance) {
    return classInstance.bot._('c.weather.day', {
      highC: info.temperatureMaxC,
      highF: info.temperatureMaxF,
      lowC: info.temperatureMinC,
      lowF: info.temperatureMinF,
      precipProb: info.precipProbability,
    });
  }

  /**
   * Retrieves the icon and colour for a given icon retrieved from the DarkSky
   * API.
   *
   * If the provided icon does not exist in the class's `colours` object, then
   * use the class's `default`.
   *
   * @arg {string} name - The icon name provided by the DarkSky API.
   * @returns {object} An object containing the `colour` and `url` to the
   * icon.
   * @private
   */
  static getIconAndColour(name) {
    const nameRetrieved = Weather.colours[name] ? name : Weather.default;

    return {
      colour: Weather.colours[nameRetrieved],
      url: `https://cdn.yuki-bot.party/commands/weather/icons/${nameRetrieved}.png`,
    };
  }

  /**
   * Retrieves data about a location - by name - from the Google Maps Geocode
   * API.
   *
   * This is used for retrieving the latitude and longitude of a location.
   *
   * @arg {string} locationName - The name of the location to retrieve.
   * @returns {Promise<Location>} Information about the location.
   * @private
   */
  static async getLocation(locationName, apiKeys) {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: locationName || 'Akihabara',
        key: apiKeys.googleMaps,
      },
    });
  }
};
