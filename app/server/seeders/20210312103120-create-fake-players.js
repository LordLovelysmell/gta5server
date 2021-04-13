'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('players', [
      {
        login: 'admin',
        password: '$2b$10$CqU67VfqgvJMe0nZwzKcZ.ng56QQ7ivlpnEm05c/DT0S3Eoy6.xDq',
        ip: '127.0.0.1',
        lastIp: '127.0.0.1',
        regDate: '2021-03-09T15:55:10.000Z',
        lastDate: '2021-03-09T15:55:10.000Z',
        position: '{"x":-164,"y":6426,"z":32,"rot":48,"dim":0}',
        socialClub: 'imShadowalker',
        createdAt: '2021-03-09T15:55:10.000Z',
        updatedAt: '2021-03-09T15:55:10.000Z'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('players', null, {});
  }
};
