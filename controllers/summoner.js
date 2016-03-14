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
    if (idStatusCode == 200) {
      summoner.id = id;
      summoner.requestStats( function(statsStatusCode, stats) {
        summoner.stats = stats;
        res.render('summoner/stats', {name: summoner.name, stats: stats, status: statsStatusCode});
      });
    } else {
      res.status(404).send("Sorry can't find that!");
    }
  });
});

module.exports = router;
