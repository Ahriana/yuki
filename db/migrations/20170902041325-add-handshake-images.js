'use strict';

const URLs = [
  'https://i.imgur.com/iFkWxgD.gif',
  'https://i.imgur.com/NYl7tfq.gif',
  'https://i.imgur.com/yqyoynb.gif',
  'https://i.imgur.com/FKKiZzc.gif',
  'https://i.imgur.com/TJZZoy3.gif',
  'https://i.imgur.com/jBjUrHS.gif',
  'https://i.imgur.com/dbVBLe1.gif',
  'https://i.imgur.com/Lqszv8E.gif',
  'https://i.imgur.com/bvJvHYB.gif',
  'https://i.imgur.com/UcVsSch.gif',
  'https://i.imgur.com/mAUIrIz.gif',
  'https://i.imgur.com/7rqM7M5.gif',
];

const Image = require('../../src/db/models/Image');
const { ImageType } = require('../../src/enums');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Image.bulkCreate(URLs.map(url => ({
      type: ImageType.HANDSHAKE,
      url,
    })));
  },
  down: function (queryInterface, Sequelize) {
    return Image.destroy({
      where: {
        url: URLs,
      },
    });
  },
};
