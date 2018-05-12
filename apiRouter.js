// import 

var express  = require ('express');
var userCtrl = require ('./routes/usersCtrl');
var trajetCtrl = require ('./routes/trajetsCtrl');
var reserCtrl  = require ('./routes/reservCtrl');
var offreVenteCtrl  = require ('./routes/offreVenteCtrl');
var offreVenteCtrl  = require ('./routes/marquesCtrl');

// Router

exports.router = (function(){
var  apiRouter = express.Router();



// users routes
apiRouter.route('/users/register/').post(userCtrl.register);
apiRouter.route('/users/login/').post(userCtrl.login);
apiRouter.route('/users/me/').get(userCtrl.getUserProfile);
apiRouter.route('/users/me/').put(userCtrl.updateUserProfile);

//Trajet routes

apiRouter.route('/trajets/new/').post(trajetCtrl.CreateTrajet);
apiRouter.route('/trajets/').get(trajetCtrl.Listtrajet);

//Reservation routes

apiRouter.route('/reservation/new').post(reserCtrl.reserver);
apiRouter.route('/reservation/modif').post(reserCtrl.modifreserv);
apiRouter.route('/reservation/annul').post(reserCtrl.annulreserv);

//OffresVentes routes
apiRouter.route('/offreVentes/new/').post(offreVenteCtrl.createOffreVente);
apiRouter.route('/offreVentes/').get(offreVenteCtrl.listoffreVentre);

//Marques and Modeles
apiRouter.route('/marques/').get();
apiRouter.route('/marques/models').get(marquesCtrl.ge);


return apiRouter;
})();