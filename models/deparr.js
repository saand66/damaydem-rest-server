'use strict';
module.exports = (sequelize, DataTypes) => {
  var DepArr = sequelize.define('DepArr', {
    VilleArr_id: DataTypes.INTEGER,
    villeDep_id: DataTypes.INTEGER
  }, {});
  DepArr.associate = function(models) {
    // associations can be defined here
    models.DepArr.belongsTo(models.VilleDep,{
      foreignKey:'VilleDep_id',
    }),
    models.DepArr.belongsTo(models.VilleArr,{
      foreignKey:'VilleArr_id',
    }),
    models.DepArr.belongsTo(models.Trajet,{
      foreignKey:'Trajets_id',
    })
  };
  return DepArr;
};