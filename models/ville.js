'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ville = sequelize.define('Ville', {
    nom: DataTypes.STRING,
    longi: DataTypes.STRING,
    lati: DataTypes.STRING,
    img1: DataTypes.STRING,
    img2: DataTypes.STRING,
    img3: DataTypes.STRING
  }, {});
  Ville.associate = function(models) {
    // associations can be defined here
  };
  return Ville;
};