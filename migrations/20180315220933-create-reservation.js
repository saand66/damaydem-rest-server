'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reservations', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idtrajet: {
        type: Sequelize.INTEGER,
        REFERENCES:{
          models:'Trajets',
          key:'idtrajet',
        }
      },
      iduser: {
        type: Sequelize.INTEGER,
        REFERENCES:{
          models:'Users',
          key:'iduser',
        }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reservations');
  }
};