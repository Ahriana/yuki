module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      anime_planet: {
        type: Sequelize.STRING(32),
      },
      age: {
        type: Sequelize.INTEGER,
      },
      birthday: {
        type: Sequelize.DATE,
      },
      bio: {
        type: Sequelize.STRING(1024),
      },
      colour: {
        type: Sequelize.INTEGER,
      },
      icon: {
        type: Sequelize.STRING(2000),
      },
      kitsu: {
        type: Sequelize.STRING(32),
      },
      location: {
        type: Sequelize.STRING(2),
      },
      myanimelist: {
        type: Sequelize.STRING(32),
      },
      name: {
        type: Sequelize.STRING(32),
      },
      osu: {
        type: Sequelize.STRING(32),
      },
      status: {
        type: Sequelize.STRING(64),
      },
      user_id: {
        type: Sequelize.STRING(20),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('profiles');
  },
};
