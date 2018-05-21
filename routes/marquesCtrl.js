var jwtutils = require ('../utils/jwt.utils');
var models = require('../models');
var asyncLib = require('async');


//const
const TARIF_MIN = 0;
const TARIF_MAX = 25000;
const ITEMS_LIMIT = 1000;


//Routes

module.exports = {

  gelmodelByMarque :function(req, res){
    var fields  = req.query.fields;
    var limit   = parseInt(req.query.limit);
    var offset  = parseInt(req.query.offset);
    var order   = req.query.order;
    var marqueId = req.body.marqueId;


    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }
console.log("marqueId :", marqueId);
    asyncLib.waterfall([
      function(done) {
        models.Marque.findOne({
          where: { id: marqueId }
        })
        .then(function(marqueFound) {
          done(null, marqueFound);
        })
        .catch(function(err) {
          console.log("mon erreur" , err )
          return res.status(500).json({ 'error': 'marque inconnue' });
        });
      },
      function(marqueFound, done) {
        if(marqueFound) {

          models.Modele.findAll({
            where: { MarqueId: marqueId},
            attributes: ['id', 'modele'],
            order: [(order != null) ? order.split(':') : ['modele', 'ASC']],
            // attributes:['lieuDep'],
             attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
             limit: (!isNaN(limit)) ? limit : null,
             offset: (!isNaN(offset)) ? offset : null,
          }
        )
          .then(function(modeles) {
            if (modeles) {
              res.status(200).json(modeles);
            } else {
              res.status(404).json({ "error": "Pas de modeles trouvés" });
            }
          }).catch(function(err) {
            console.log(err);
            res.status(500).json({ "error": "invalid fields" });
          });

        } else {
          res.status(404).json({ 'error': 'marque non trouvée' });
        }
     },
    ]);


  },

  getAllMarque :function(req, res){

    var fields  = req.query.fields;
    var limit   = parseInt(req.query.limit);
    var offset  = parseInt(req.query.offset);
    var order   = req.query.order;

    if (limit > ITEMS_LIMIT) {
      limit = ITEMS_LIMIT;
    }

    models.Marque.findAll({
      order: [(order != null) ? order.split(':') : ['marque', 'ASC']],
     // attributes:['lieuDep'],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
     
        
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
  },

 
  getVoitByCritere : function(req, res) {

    var marque   = req.body.marque;
    var modele = req.body.modele;
    var prix = req.body.prix;
    var annee = req.body.annee;
    var kilometre = req.body.kilometre;
    var carburant = req.body.carburant;
    var boitevitesse = req.body.boitevitesse;
    var tarifvoy = req.body.tarifvoy;
    const Op = Sequelize.Op;

    if (marque != null) {

    }

    if (modele != null) {
      
    }
    if (prix != null) {
      
    }
    if (annee != null) {
      
    }
    if (kilometre != null) {
      
    }
    if (carburant != null) {
      
    }


    models.Marque.findAll({

      where: {
        [Op.And]: [{marque: marque}, {authorId: 13}]
      },


      order: [(order != null) ? order.split(':') : ['marque', 'ASC']],
     // attributes:['lieuDep'],
      attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
      limit: (!isNaN(limit)) ? limit : null,
      offset: (!isNaN(offset)) ? offset : null,
     
        
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