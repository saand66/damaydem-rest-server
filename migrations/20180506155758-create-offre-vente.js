'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OffreVentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marque: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      annee: {
        type: Sequelize.STRING
      },
      prix: {
        type: Sequelize.NUMBER
      },
      kilometrage: {
        type: Sequelize.NUMBER
      },
      boitevit: {
        type: Sequelize.STRING
      },
      couleur: {
        type: Sequelize.STRING
      },
      douane: {
        type: Sequelize.BOOLEAN
      },
      isurgent: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('OffreVentes');
  }
};