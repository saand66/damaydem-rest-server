'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    numtel: DataTypes.TEXT,
    motdepass: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    username: DataTypes.STRING,
    descrip: DataTypes.STRING,
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,

  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Trajet)
  };
  return User;
};