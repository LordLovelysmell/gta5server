'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Character }) {
      // define association here
      this.hasMany(Character, { as: 'characters', foreignKey: 'playerId' })
    }
  };
  Player.init({
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastIp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    regDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    socialClub: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Player',
    tableName: 'players'
  });
  return Player;
};
