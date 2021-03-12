'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
    await queryInterface.dropTable('players');
  }
};
