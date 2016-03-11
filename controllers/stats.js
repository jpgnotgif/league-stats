var express = require('express');
var router = express.Router();

/* GET stats listing listing. */
router.get('/:name/stats', function(req, res, next) {
  res.send("Summoner name: " + req.params.name);
});

module.exports = router;
