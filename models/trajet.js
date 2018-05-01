'use strict';
module.exports = (sequelize, DataTypes) => {
  var Trajet = sequelize.define('Trajet', {
     lieuDep: DataTypes.INTEGER,
     lieuArr: DataTypes.INTEGER,
     dateDep: DataTypes.STRING,
     heureDep: DataTypes.STRING,
     tarifvoy: DataTypes.INTEGER,
     UserId: DataTypes.INTEGER,
     nbplace: DataTypes.INTEGER,
     nbplacedispo: DataTypes.INTEGER,
     VilleArrId: DataTypes.INTEGER,
     VilleDepId: DataTypes.INTEGER
  }, {});
  Trajet.associate = function(models) {
    // associations can be defined here
    models.Trajet.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    }),
    models.Trajet.belongsTo(models.VilleArr,{
      foreignKey:'VilleArrId',
    }),
    models.Trajet.belongsTo(models.VilleDep,{
      foreignKey:'VilleDepId',
    })
  };
  return Trajet;
};