'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Character, BankCard }) {
      // define association here
      this.hasMany(BankCard, { foreignKey: 'bankCardId' })
    }
  };
  BankAccount.init({
    characterId: {
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }
  }, {
    sequelize,
    modelName: 'BankAccount',
    tableName: 'bank_accounts'
  });
  return BankAccount;
};
