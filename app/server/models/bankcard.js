'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bankCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bankCard.init({
    bankAccountId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'BankAccount',
      //   key: 'id',
      // }
    },
    balance: DataTypes.INTEGER,
    pinCode: DataTypes.INTEGER,
    isDefault: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'bankCard',
  });
  return bankCard;
};
