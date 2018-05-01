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
     lieuDep_id: DataTypes.INTEGER,
     lieuArr_id: DataTypes.INTEGER
  }, {});
  Trajet.associate = function(models) {
    // associations can be defined here
    models.Trajet.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    }),
    models.Trajet.belongsTo(models.DepArr,{
      foreignKey:'DepArrs_id',
    })
  };
  return Trajet;
};