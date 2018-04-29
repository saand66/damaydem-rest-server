'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trajets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        REFERENCES:{
          models:'Users',
          key:'id',
        }
      },
      lieuArr_id: {
        type: Sequelize.INTEGER,
        REFERENCES:{
          models:'Villes',
          key:'id',
        }
      },
      lieuDep_id: {
        type: Sequelize.INTEGER,
        REFERENCES:{
          models:'Villes',
          key:'id',
        }
      },
      lieuDep: {
        allowNull: false,
        type: Sequelize.STRING
      },
      
      dateDep: {
        allowNull: false,
        type: Sequelize.DATE
      },
      heureDep: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tarifvoy: {
        allowNull: false,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trajets');
  }
};