var summonerModel = require('../models/summoner');
var express = require('express');
var router = express.Router();

/* GET stats listing listing. */
router.post('/', function(req, res, next) {

  var id;
  var summonerName = req.body.name;
  var summoner = new summonerModel(summonerName);
  summoner.requestId( function(id) {
    console.log("ID from callback: " + id);
    res.json({name: summoner.name, id: id});
  });

});

module.exports = router;
