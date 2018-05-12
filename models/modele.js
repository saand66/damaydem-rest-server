'use strict';
module.exports = (sequelize, DataTypes) => {
  var Modele = sequelize.define('Modele', {
    modele: DataTypes.STRING
  }, {});
  Modele.associate = function(models) {
    // associations can be defined here
    models.Modele.belongsTo(models.Marque,{
      foreignKey:'MarquesId',
    })
  };
  return Modele;
};