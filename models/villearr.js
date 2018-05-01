'use strict';
module.exports = (sequelize, DataTypes) => {
  var VilleArr = sequelize.define('VilleArr', {
    nom: DataTypes.STRING,
    longi: DataTypes.STRING,
    lati: DataTypes.STRING,
    img1: DataTypes.STRING,
    img2: DataTypes.STRING,
    img3: DataTypes.STRING
  }, {});
  VilleArr.associate = function(models) {
    // associations can be defined here
    models.VilleArr.hasMany(models.Trajet)
  };
  return VilleArr;
};