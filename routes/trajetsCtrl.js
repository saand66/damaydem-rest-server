var jwtutils = require ('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');


//const
const TARIF_MIN = 0;
const TARIF_MAX = 25000;
const ITEMS_LIMIT = 50;


//Routes

module.exports = {

  CreateTrajet: function (req, res) {

    var headerAuth = req.headers['authorization'];
    var userId = jwtutils.getUserId(headerAuth);

    console.log("le user ID est " + userId);
//Parametres 

  var lieuDep   = req.body.lieuDep;
  var lieuArr = req.body.lieuArr;
  var dateDep = req.body.dateDep;
  var lieuArr_id = req.body.lieuArr_id;
  var lieuDep_id = req.body.lieuDep_id;
  var heureDep = req.body.heureDep;
  var tarifvoy = req.body.tarifvoy;
  var nbplace = req.body.nbplace;

 
 // console.log("le lieuDep 1 " , req.body.json);
  console.log("le lieuDep 2 " , req.body);

  console.log("lreq.body.lieuArr " , req.body.lieuArr);


    if (lieuDep == null || lieuArr == null || lieuDep_id == null || lieuArr_id == null || dateDep == null || heureDep == null || tarifvoy == null || nbplace == null) {
     
      return res.status(400).json({ 'error': ' Parametres manquants' });
    }
    

    if (tarifvoy <= TARIF_MIN || tarifvoy > TARIF_MAX) {
      return res.status(400).json({ 'error': ' Tarif Invalid' });
    }

    asyncLib.waterfall([
        function(done) {
          models.User.findOne({
            where: { id: userId }
          })
          .then(function(userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({ 'error': 'utilisateur non reconnu' });
          });
        },
        function(userFound, done) {
          if(userFound) {

        console.log("le userFound.id " + userFound.id);

          models.Trajet.create({
            lieuDep: lieuDep,
            lieuArr: lieuArr,
            lieuDep_id: lieuDep_id,
            lieuArr_id: lieuArr_id,
            dateDep: dateDep,
            heureDep: heureDep,
            tarifvoy: tarifvoy,
            nbplace: nbplace,
            nbplacedispo: nbplace,
            UserId: userFound.id
          })
            .then(function (newTrajet) {
              done(newTrajet);
            });
        } else {
          console.log("le userId non trouvé " + userId);
          res.status(404).json({ 'error': 'utilisateur non trouvé' });
        }
      },
    ], function (newTrajet) {
      if (newTrajet) {
        return res.status(201).json(newTrajet);
      } else {
        return res.status(500).json({ 'error': ' Enregistrement Trajet Impossible' });
      }
    });



},


Listtrajet :function (req, res){

    var fields  = req.query.fields;
    var limit   = parseInt(req.query.limit);
    var offset  = parseInt(req.query.offset);
    var order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Trajet.findAll({
      order: [(order != null) ? order.split(':') : ['lieuDep', 'ASC']],
     // attributes:['lieuDep'],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
      include: [{
        model: models.User,
        attributes: [ 'prenom', 'nom' ], 
      }],
      include: [{
        model: models.VilleDep,
        attributes: [ 'nom', 'img1' ],
      }],
      include: [{
        model: models.User,
        attributes: [ 'prenom', 'nom' ], 
      }],
     
        
    }).then(function(trajets) {
      if (trajets) {
        res.status(200).json(trajets);
      } else {
        res.status(404).json({ "error": "Pas de trajets trouvés" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
  }

}