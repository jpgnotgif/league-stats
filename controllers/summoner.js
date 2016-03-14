var summonerModel = require('../models/summoner');
var championModel = require('../models/champion');

var express = require('express');
var router = express.Router();

/* GET stats listing listing. */
router.get('/stats', function(req, res, next) {
  var id;
  var stats;
  var summonerName = req.query.name;
  var summoner = new summonerModel(summonerName);

  summoner.requestId( function(idStatusCode, id) {
    // TODO: error handling
    summoner.id = id;
    summoner.requestStats( function(metricsStatusCode, stats) {
      summoner.stats = stats;
      res.render('summoner/stats', {name: summoner.name, stats: stats})
    });
  });
});

module.exports = router;
