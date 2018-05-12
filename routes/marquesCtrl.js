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
      order: [(order != null) ? order.split(':') : ['nom', 'ASC']],
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