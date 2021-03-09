'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.TINYINT
      },
      fatherId: {
        type: Sequelize.TINYINT
      },
      motherId: {
        type: Sequelize.TINYINT
      },
      skinMix: {
        type: Sequelize.DECIMAL
      },
      shapeMix: {
        type: Sequelize.DECIMAL
      },
      faceFeatures: {
        type: Sequelize.TEXT
      },
      headOverlayData: {
        type: Sequelize.TEXT
      },
      componentVariationData: {
        type: Sequelize.TEXT
      },
      playerId: {
        type: Sequelize.INTEGER
      },
      cash: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('characters');
  }
};
