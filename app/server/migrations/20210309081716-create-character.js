'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      gender: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      fatherId: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      motherId: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      skinMix: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      shapeMix: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      faceFeatures: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      headOverlayData: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      componentVariationData: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cash: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('characters');
  }
};
