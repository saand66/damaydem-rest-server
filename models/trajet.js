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
     DepArrs_id: DataTypes.INTEGER
  }, {});
  Trajet.associate = function(models) {
    // associations can be defined here
    models.Trajet.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    })
  };
  return Trajet;
};