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

  summoner.requestId( function(id) {
    // TODO: error handling

    summoner.id = id;
    summoner.requestStats( function(stats) {
      summoner.stats = stats;
      res.render('summoner/stats', {name: summoner.name, stats: stats})
    });
  });
});

router.get('/champion_img', function(req, res, next) {
  var championId = req.query.championId;

  var champion = new championModel(championId);
  champion.requestImg(function(championImgUrl) {
    res.send(championImgUrl);
  });

});

module.exports = router;
