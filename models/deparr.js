'use strict';
module.exports = (sequelize, DataTypes) => {
  var DepArr = sequelize.define('DepArr', {
    VilleArr_id: DataTypes.INTEGER,
    villeDep_id: DataTypes.INTEGER
  }, {});
  DepArr.associate = function(models) {
    // associations can be defined here
  };
  return DepArr;
};