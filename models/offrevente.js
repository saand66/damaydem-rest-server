'use strict';
module.exports = (sequelize, DataTypes) => {
  var OffreVente = sequelize.define('OffreVente', {
    marque: DataTypes.STRING,
    modele: DataTypes.STRING,
    annee: DataTypes.STRING,
    prix: DataTypes.INTEGER,
    kilometrage: DataTypes.INTEGER,
    boitevit: DataTypes.STRING,
    carburant: DataTypes.STRING,
    couleur: DataTypes.STRING,
    douane: DataTypes.BOOLEAN,
    isurgent: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    img1: DataTypes.STRING,
    img2: DataTypes.STRING,
    img3: DataTypes.STRING,
  }, {});
  OffreVente.associate = function(models) {
    // associations can be defined here
    models.OffreVente.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    })
  };
  return OffreVente;
};