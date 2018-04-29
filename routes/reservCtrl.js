var jwtutils = require('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');


//Routes 
module.exports = {


    reserver: function (req, res) {

        // 1- Id du users n'est pas vide 
        // 2 - qu'il est toujours connecté
        // 3 id du trajet n'est pas vide
        // 4 - nombre de place disponible du trajet est superieur ou egal au nombre souhaiter pour la reserver

        // console.log("Req body :" +  req.body.newReservation);
        var idtrajet = req.body.trajetId;
        var iduser = req.body.iduser;
        var nbplaceareserv = req.body.nbplaceareserv;
        var montantEncaisse = req.body.montantEncaisse;
        //var nbplacedispo = 0;

        var headerAuth = req.headers['authorization'];
        var iduser = jwtutils.getUserId(headerAuth);


        if (idtrajet == null) {
            return res.status(400).json({ 'error': 'trajet non conforme' });
        }

        if (iduser < 0) {
            return res.status(400).json({ 'error': 'wrong token' });

        } else {

            asyncLib.waterfall([
                function (done) {
                    models.Trajet.findOne({
                        attributes: ['id', 'nbplacedispo', 'nbplace'],
                        where: { id: idtrajet }
                    }).then(function (trajetFound) {
                        done(null, trajetFound);
                    })
                        .catch(function (err) {
                            console.log(err)
                            return res.status(500).json({ 'error': 'Impossible de verifier le trajet ' });
                        });
                }, function (trajetFound, done) {
                    // console.log("trajetFound : " , trajetFound)
                    if (trajetFound) {
                        if (trajetFound.nbplacedispo > 0) {
                            if (trajetFound.nbplacedispo >= nbplaceareserv) {
                                trajetFound.update({
                                    // nbplacedispo: (nbplacedispo ? trajetFound.nbplace - 1 : trajetFound.nbplace - 1)
                                    nbplacedispo: trajetFound.nbplacedispo - nbplaceareserv
                                }).then(function () {
                                    done(trajetFound);
                                }).catch(function (err) {
                                    res.status(500).json({ 'error': 'cannot update trajet pour reservation' });
                                });
                            } else {
                                res.status(404).json({ 'error': 'Pas assez de place pour votre reservation' });
                            }

                        } else {
                            res.status(404).json({ 'error': 'trajet complet' });
                        }

                    } else {
                        res.status(404).json({ 'error': 'trajet not found' });
                    }
                },
            ], function (trajetFound) {
                if (trajetFound) {
                    var newReservation = models.Reservation.create({
                        UserId: iduser,
                        TrajetId: idtrajet,
                        nbplaceareserv: nbplaceareserv,
                        montantEncaisse: montantEncaisse,
                    })

                    return res.status(201).json(trajetFound);
                } else {
                    return res.status(500).json({ 'error': ' reservation  impossible' });
                }
            });


        }

    },

    modifreserv: function (req, res) {


    },

    annulreserv: function (req, res) {

        // 1- Id du users n'est pas vide 
        // 2 - qu'il est toujours connecté
        // 3 id du trajet n'est pas vide
        // 4 - on cherche dans la table trajet, le nombre de place a supprimer
        // 4 - on supprime la reservations
        // 6 - on met à jour le nombre de place disponible du trajet conserné



        var idreservation = req.body.idreservation;
        // var iduser = req.body.iduser;
        var nbplaceasupp = 0;
        // var nbplacedispo = 0;
        var headerAuth = req.headers['authorization'];
        var iduser = jwtutils.getUserId(headerAuth);

        if (idreservation == null) {
            return res.status(400).json({ 'error': 'reservation non conforme' });
        }

        if (iduser < 0) {
            return res.status(400).json({ 'error': 'wrong token' });

        } else {

            asyncLib.waterfall([
                function (done) {
                    models.Reservation.findOne({
                        attributes: ['id'],
                        where: { id: idreservation }
                    }).then(function (reservationFound) {
                        done(null, reservationFound);
                    })
                        .catch(function (err) {
                            return res.status(500).json({ 'error': 'Impossible de verifier la reservation ' });
                        });
                },
                function (reservationFound, done) {
                    if (reservationFound) {
                        nbplaceasupp: reservationFound.nbplaceareserv
                        reservationFound.destroy({
                            where: { id: idreservation }
                        }).then(function (reservationdeleted) {
                            done(null, reservationdeleted);
                        }).catch(function (err) {
                            console.log(err);
                            res.status(500).json({ 'error': 'Impossible de supprimer la reservation' });
                        });
                    } else {
                        res.status(404).json({ 'error': 'reservation non existante' });
                    }
                },
                function (reservationdeleted) {
                    if (reservationdeleted) {
                        return res.status(201).json("reservation supprimee avec succes");
                    } else {
                        console.log(err);
                        return res.status(500).json({ 'error': 'suppression non aboutie' });
                    }
                }
            ]
            );


        }
    }

}







        //To implement

