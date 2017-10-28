#!/usr/bin/node

const config = require('../config');

const modelsFolder = config.models_folder;

if (!modelsFolder) {
  console.log('Requires specifying a `models_folder` in your config.');

  process.exit(1);
}

const Sequelize = require('sequelize');
const { GuildSetting, Profile, Quote, Reminder, Tag } = require(modelsFolder);

const jsonFolder = config.json_folder;

if (!jsonFolder) {
  console.log('Requires specifying a `json_folder` in your config.');

  process.exit(2);
}

const sequelize = new Sequelize(
  config.db.mysql.db_name,
  config.db.mysql.username,
  config.db.mysql.password,
  {
    host: config.db.mysql['host'] || 'localhost',
    dialect: 'mysql',
  },
);

const ChannelIgnore = sequelize.define('channel_ignore', {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER,
  },
  channel_id: Sequelize.DataTypes.INTEGER,
}, { timestamps: false });

const ServerSetting = sequelize.define('server_setting', {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER,
  },
  guild_id: Sequelize.DataTypes.INTEGER,
  channel_id: Sequelize.DataTypes.STRING,
  settings: Sequelize.DataTypes.STRING,
  disabled_commands: Sequelize.DataTypes.STRING,
}, { timestamps: false });

const UserSetting = sequelize.define('user_setting', {
  id: {
    primaryKey: true,
    type: Sequelize.DataTypes.INTEGER,
  },
  user_id: Sequelize.DataTypes.INTEGER,
  user_profile: Sequelize.DataTypes.STRING,
}, { timestamps: false });

async function main() {
  /**
   * @type {Object<string, string>}
   */
  const guildPrefixes = require(`${jsonFolder}/guildPrefixes.json`);

  const guildSettings = {};

  for (const [id, prefix] of Object.entries(guildPrefixes)) {
    guildSettings[id] = {
      disabled_commands: [],
      guild_id: id,
      leave_channel_id: null,
      leave_content: null,
      muted_channel_ids: [],
      prefix: prefix,
      tableflip_enabled: false,
      welcome_channel_id: null,
      welcome_content: null,
    };
  }

  /**
   * @type {string[]}
   */
  const loadedQuotes = require(`${jsonFolder}/quote.json`);

  const quotes = [];

  for (const quote of loadedQuotes) {
    const plans = [
      'From voice chat: "',
      '__From voice chat:__ \n"',
      '**__From voice chat:__**\n"',
      'From text chat: "',
      '__From text chat::_ \n"',
      '**__From text chat:__**\n"',
    ];

    let content;
    /**
     * Text = 0, Voice = 1
     */
    let type;

    for (const plan of plans) {
      if (quote.startsWith(plan)) {
        content = quote.substring(quote.indexOf(plan) + 1);

        if (quote.includes('From voice chat:')) {
          type = 1;
        } else {
          type = 0;
        }
      }
    }

    if (!content) {
      content = quote;
      type = 0;
    }

    quotes.push({
      author_id: '136107769680887808',
      message_id: null,
      content,
      type,
    });
  }

  // noinspection JSUnresolvedFunction
  await Quote.bulkCreate(quotes);

  /**
   * @type {object}
   */
  const loadedReminders = require(`${jsonFolder}/reminders.json`);
  const reminders = Object.values(loadedReminders)
    .map(reminder => ({
      channel_id: reminder.channel_id,
      content: reminder.content,
      reminded_for: reminder.reminded_for,
      user_id: reminder.user_id,
    }));

  // noinspection JSUnresolvedFunction
  await Reminder.bulkCreate(Object.values(reminders));

  const tagsMapped = Object.entries(require(`${jsonFolder}/tags.json`))
    .filter(guildTags => guildTags[0] !== 'global' && guildTags[0] !== '')
    .map(guildTags => {
      const [guildId, tags] = guildTags;

      const mapped = [];

      for (const [name, tag] of Object.entries(tags)) {
        mapped.push({
          author_id: tag['author'],
          guild_id: guildId,
          last_used: null,
          name: name,
          uses: 0,
          value: tag['content'],
          // createdAt: tag['creation'],
        });
      }

      return mapped;
    })
    .filter(x => !!x);

  const tags = [];

  for (const mappedTag of tagsMapped) {
    for (const tag of mappedTag) {
      tags.push(tag);
    }
  }

  // noinspection JSUnresolvedFunction
  await Tag.bulkCreate(tags);

  const channelGuildMap = require(config.channel_guild_map);

  // noinspection JSUnresolvedFunction
  const serverSettings = await ServerSetting.findAll();

  for (const setting of serverSettings) {
    const sid = setting['guild_id'];

    if (!guildSettings[sid]) {
      guildSettings[sid] = {
        disabled_commands: [],
        guild_id: sid,
        leave_channel_id: null,
        leave_content: null,
        muted_channel_ids: [],
        prefix: null,
        tableflip_enabled: false,
        welcome_channel_id: null,
        welcome_content: null,
      };
    }

    if (guildSettings[sid]) {
      guildSettings[sid]['disabled_commands'] = Object.keys(JSON.parse(setting['disabled_commands']));
      const settings = JSON.parse(setting['settings']);

      guildSettings[sid]['tableflip_enabled'] = Boolean(settings['tableflip']);

      if (settings['welcome'] && setting['channel_id']) {
        guildSettings[sid]['welcome_channel_id'] = setting['channel_id'];
        guildSettings[sid]['welcome_content'] = settings['welcome'];
      }

      if (settings['leave'] && setting['channel_id']) {
        guildSettings[sid]['leave_channel_id'] = setting['channel_id'];
        guildSettings[sid]['leave_content'] = settings['leave'];
      }
    }
  }

  // noinspection JSUnresolvedFunction
  const channelIgnores = await ChannelIgnore.findAll();

  for (const channelIgnore of channelIgnores) {
    const cid = channelIgnore['channel_id'];

    if (!cid) {
      continue;
    }

    const guildId = channelGuildMap[cid];

    if (!guildId) {
      continue;
    }

    if (!guildSettings[guildId]) {
      guildSettings[guildId] = {
        guild_id: guildId,
        muted_channel_ids: [cid],
      };
    } else {
      if (!guildSettings[guildId].muted_channel_ids) {
        guildSettings[guildId].muted_channel_ids = [];
      }

      guildSettings[guildId].muted_channel_ids.push(cid);
    }
  }

  // noinspection JSUnresolvedFunction
  await GuildSetting.bulkCreate(Object.values(guildSettings));

  // noinspection JSUnresolvedFunction
  const userSettings = await UserSetting.findAll();

  const profiles = userSettings.map(profileData => {
    const uid = profileData['user_id'];
    const profile = JSON.parse(profileData['user_profile']);

    return {
      age: profile['age'] ? profile['age'] : null,
      anime_planet: profile['animeplanet'] ? profile['animeplanet'] : null,
      birthday: null,
      bio: profile['bio'] ? profile['bio'] : null,
      colour: null,
      icon: null,
      kitsu: profile['hummingbird'] ? profile['hummingbird'] : null,
      location: profile['location'] ? profile['location'] : null,
      myanimelist: profile['myanimelist'] ? profile['myanimelist'] : null,
      name: profile['name'] ? profile['name'] : null,
      osu: null,
      status: profile['status'] ? profile['status'] : null,
      user_id: uid,
    };
  });

  // noinspection JSUnresolvedFunction
  await Profile.bulkCreate(profiles);

  return null;
}

main().then(() => process.exit(0)).catch(console.log);
