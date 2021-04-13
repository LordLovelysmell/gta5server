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

    await queryInterface.bulkInsert('characters', [
      {
        gender: 0,
        fatherId: 2,
        motherId: 23,
        skinMix: '0',
        shapeMix: '1',
        faceFeatures: "[\"-0.4\",\"-0.25\",\"-0.4\",\"0.4\",\"-0.4\",\"0.2\",\"-0.55\",\"-0.2\",\"-0.1\",\"-0.25\",\"0.05\",\"-0.7\",\"-0.75\",\"0.4\",\"0.8\",\"-0.05\",0.5,\"0.05\",\"-0.25\",\"0.5\"]",
        headOverlayData: "[{\"overlayId\":0,\"index\":2,\"opacity\":\"0.65\"},{\"overlayId\":1,\"index\":22},{\"overlayId\":2,\"index\":2},{\"overlayId\":3,\"index\":1,\"opacity\":\"0.65\"},{\"overlayId\":4,\"index\":0},{\"overlayId\":5,\"index\":0},{\"overlayId\":6,\"index\":1},{\"overlayId\":7,\"index\":0},{\"overlayId\":8,\"index\":0},{\"overlayId\":9,\"index\":1},{\"overlayId\":10,\"index\":2},{\"overlayId\":11,\"index\":2},{\"overlayId\":12,\"index\":0}]",
        componentVariationData: "[{\"componentId\":2,\"drawableId\":1},{\"componentId\":11,\"drawableId\":0},{\"componentId\":4,\"drawableId\":1},{\"componentId\":6,\"drawableId\":6}]",
        playerId: 1,
        cash: 0,
        createdAt: '2021-03-09T15:56:46.000Z',
        updatedAt: '2021-03-09T15:56:46.000Z'
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

    await queryInterface.bulkDelete('characters', null, {});
  }
};
