'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Character.init({
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
  }, {
    sequelize,
    modelName: 'Character',
    tableName: 'characters'
  });
  return Character;
};
