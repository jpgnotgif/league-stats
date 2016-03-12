var summonerModel = require('../models/summoner');
var express = require('express');
var router = express.Router();

/* GET stats listing listing. */
router.post('/', function(req, res, next) {

  var summonerName = req.body.name;

  var summoner = new summonerModel(summonerName);

  res.send(summoner.recentGames());



});

module.exports = router;
