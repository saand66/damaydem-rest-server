'use strict';
module.exports = (sequelize, DataTypes) => {
  var Marque = sequelize.define('Marque', {
    marque: DataTypes.STRING
  }, {});


  Marque.associate = function(models) {
    // associations can be defined here
    models.Marque.hasMany(models.Modele)
  };
  return Marque;
};