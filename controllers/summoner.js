var summonerModel = require('../models/summoner');
var express = require('express');
var router = express.Router();

/* GET stats listing listing. */
router.post('/', function(req, res, next) {

  var id;
  var stats;

  var summonerName = req.body.name;
  var summoner = new summonerModel(summonerName);
  summoner.requestId( function(id) {
    summoner.id = id;

    summoner.requestStats( function(stats) {
      summoner.stats = stats;

      res.json({name: summoner.name, id: id, stats: stats});

    });

  });

});

module.exports = router;
