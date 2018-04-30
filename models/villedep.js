'use strict';
module.exports = (sequelize, DataTypes) => {
  var VilleDep = sequelize.define('VilleDep', {
    nom: DataTypes.STRING,
    longi: DataTypes.STRING,
    lati: DataTypes.STRING,
    img1: DataTypes.STRING,
    img2: DataTypes.STRING,
    img3: DataTypes.STRING
  }, {});
  VilleDep.associate = function(models) {
    // associations can be defined here
    models.VilleDep.belongsTo(models.DepArr); 
  };
  return VilleDep;
};