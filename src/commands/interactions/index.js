const axios = require('axios');

/**
 * @param {string} type
 * @param {Yuki} bot
 *
 * @returns {Promise.<void|string>}
 */
async function getImage(type, bot) {
  let image;

  try {
    image = await axios({
      url: 'https://api.weeb.sh/images/random',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + bot.apiKeys.weebApi,
        'user-agent': 'Yuki',
      },
      params: {
        type: type,
      },
    });
  } catch (e) {
    bot.log.warn(`Error retrieving ${type} image`, e);

    return;
  }

  return image.data.url;
}

module.exports = {
  getImage,
};
