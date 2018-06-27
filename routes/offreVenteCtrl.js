var jwtutils = require ('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');
var Sequelize = require('sequelize');

//const
const TARIF_MIN = 0;
const TARIF_MAX = 25000;
const ITEMS_LIMIT = 50;


//Routes

module.exports = {

  createOffreVente: function (req, res) {

    var headerAuth = req.headers['authorization'];
    var userId = jwtutils.getUserId(headerAuth);

    console.log("le user ID est " + userId);

  //Parametres 

  var marque = req.body.marque;
  var model = req.body.model;
  var annee = req.body.annee;
  var carburant = req.body.carburant;
  var prix = req.body.prix;
  var kilometrage = req.body.kilometrage;
  var boitevit = req.body.boitevit;
  var couleur = req.body.couleur;
  var douane = req.body.douane;
  var description = req.body.description;
  var img1 = req.body.img1;
  var img2 = req.body.img2;
  var img3 = req.body.img3;

 

    if (marque == null || model == null || annee == null || carburant == null || prix == null || kilometrage == null) {
      return res.status(400).json({ 'error': ' Infos manquantes pour votre offre' });
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

          models.OffreVente.create({
             marque: marque,
             model: model,
             annee: annee,
             carburant: carburant,
             prix: prix,
             kilometrage: kilometrage,
             boitevit: boitevit,
             couleur:couleur,
             douane: douane,
             description : description,
             UserId: userFound.id
          })
         
            .then(function(newOffreVente) {
              
              done(newOffreVente);
            });
        } else {
          console.log("le userId non trouvé " + userId);
          res.status(404).json({ 'error': 'utilisateur non trouvé' });
        }
      },
    ], function (newOffreVente) {
      if (newOffreVente) {
        newOffreVente.update({
            img1 : newOffreVente.id+'_'+img1,
            img2 : newOffreVente.id+'_'+img2,
            img3 : newOffreVente.id+'_'+img3,
            
         })
        return res.status(201).json(newOffreVente);
      } else {
        return res.status(500).json({ 'error': ' Enregistrement offre Impossible' });
      }
    });



},


listoffreVentre :function (req, res){

    var fields  = req.query.fields;
    var limit   = parseInt(req.query.limit);
    var offset  = parseInt(req.query.offset);
    var order   = req.query.order;
    
    
    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.OffreVente.findAll({
      order: [(order != null) ? order.split(':') : ['marque', 'ASC']],
     // attributes:['lieuDep'],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
     
     // }]
    }).then(function(OffreVentes) {
      if (OffreVentes) {
        res.status(200).json(OffreVentes);
      } else {
        res.status(404).json({ "error": "Pas de trajets trouvés" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
  },

  
  getOffreVenteByCritere : function(req, res) {

    var marque   = req.body.marque;
    var modele = req.body.modele;
    var prix = req.body.prix;
    var annee = req.body.annee;
    var kilometre = req.body.kilometre;
    var carburant = req.body.carburant;
    var boitevitesse = req.body.boitevitesse;
    const Op = Sequelize.Op;

    var opemarque ;
    var opeannee;
    var whereCondition = {};

    whereCondition['1'] = 1;
   

    if (marque != null) {
     whereCondition['marque'] = marque;
    }
    if (modele != null) {
      whereCondition['model'] = modele;
    }

    if (prix != null) {
     
    }
    if (annee != null) {
     
    }
    if (kilometre != null) {
      
    }
    if (carburant != null) {
      
    }
   
    console.log(whereCondition)
    models.OffreVente.findAll({
      where: 
        whereCondition
      ,

      /*order: [(order != null) ? order.split(':') : ['marque', 'ASC']],
     // attributes:['lieuDep'],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,*/
     
        
    }).then(function(marques) {
      if (marques) {
        res.status(200).json(marques);
      } else {
        res.status(404).json({ "error": "Pas de marques trouvés" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });

  }

}