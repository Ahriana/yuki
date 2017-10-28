const { GuildSetting } = require('../../src/db/models');

const [TABLE_NAME, COLUMN_NAMES] = [
  'guild_settings',
  [
    'disabled_commands',
    'muted_channel_ids',
  ],
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`alter table ${TABLE_NAME}
      alter ${COLUMN_NAMES[0]} drop default,
      alter ${COLUMN_NAMES[0]} type text[] using array[${COLUMN_NAMES[0]}],
      alter ${COLUMN_NAMES[0]} set default '{}',
      alter ${COLUMN_NAMES[1]} drop default,
      alter ${COLUMN_NAMES[1]} type text[] using array[${COLUMN_NAMES[1]}],
      alter ${COLUMN_NAMES[1]} set default '{}'`);

    // noinspection JSUnresolvedFunction
    const settings = await GuildSetting.findAll();

    return Promise.all(settings.map(setting => {
      setting.disabled_commands = setting
        .disabled_commands[0]
        .split(',')
        .filter(disabledCommand => disabledCommand !== '');

      setting.muted_channel_ids = setting
        .muted_channel_ids[0]
        .split(',')
        .filter(mutedChannelId => mutedChannelId !== '');

      return setting.save();
    }));
  },
  down: async (queryInterface, Sequelize) => {
    const newInfo = {
      allowNull: false,
      defaultValue: '',
      type: Sequelize.STRING('2000'),
    };

    return Promise.all([
      queryInterface.changeColumn(TABLE_NAME, COLUMN_NAMES[0], newInfo),
      queryInterface.changeColumn(TABLE_NAME, COLUMN_NAMES[1], newInfo),
    ]);
  },
};
