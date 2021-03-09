'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  character.init({
    gender: DataTypes.TINYINT,
    fatherId: DataTypes.TINYINT,
    motherId: DataTypes.TINYINT,
    skinMix: DataTypes.DECIMAL,
    shapeMix: DataTypes.DECIMAL,
    faceFeatures: DataTypes.TEXT,
    headOverlayData: DataTypes.TEXT,
    componentVariationData: DataTypes.TEXT,
    playerId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'Player',
      //   key: 'id',
      // }
    },
    cash: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'character',
  });
  return character;
};
