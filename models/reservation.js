'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reservation = sequelize.define('Reservation', {
    UserId: DataTypes.INTEGER,
    TrajetId: DataTypes.INTEGER,
    nbplaceareserv: DataTypes.INTEGER,
    montantEncaisse:DataTypes.INTEGER,
  }, {});
  Reservation.associate = function(models) {
    // associations can be defined here
    models.Reservation.belongsTo(models.User,{
      foreignKey:{
        allowNull: false
      }
    }),

    models.Reservation.belongsTo(models.Trajet,{
      foreignKey:{
        allowNull: false
      }
    })
  };
  return Reservation;
};  