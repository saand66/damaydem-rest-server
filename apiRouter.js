// import 

var express  = require ('express');
var userCtrl = require ('./routes/usersCtrl');
var trajetCtrl = require ('./routes/trajetsCtrl');
var reserCtrl  = require ('./routes/reservCtrl');

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

return apiRouter;
})();