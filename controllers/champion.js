var championModel = require('../models/champion');

var express = require('express');
var router = express.Router();

router.param('id', function(req, res, next, id) {

  /*
   * TODO: use the id to query a cache
   * for champion data
   */

  next();
});

router.get('/:id/image', function(req, res, next) {
  var championId = req.params.id;
  var champion = new championModel(championId);
  champion.requestImg(function(championImgUrl) {
    res.send(championImgUrl);
  });
});

module.exports = router;
