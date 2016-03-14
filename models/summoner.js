var request = require('request');
var math = require('mathjs');
var championModel = require('./champion');

var queryParams = {
  api_key: process.env.leagueApiKey
};

var Summoner = function(name) {
  this.name = name.toLowerCase();
  this.requestId = function(callback) {
    var name = this.name;
    var id;
    var statusCode;
    var baseUrl = `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${name}`;
    request({url: baseUrl, qs: queryParams}, function(error, response, body) {
      statusCode = response.statusCode;
      var id;
      if (!error && statusCode == 200) {
        try {
          jsonBody = JSON.parse(body);
          id = jsonBody[name]['id'];
        } catch(e) {
          statusCode = 503;
        }
      }
      callback(statusCode, id);
    });
  };

  this.requestStats = function(callback) {
    var id = this.id;
    var baseUrl = `https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/${id}/recent`;
    var gameStats = [];
    var championData = {};
    var statusCode;

    request( {url: baseUrl, qs: queryParams}, function(error, response, body) {
      statusCode = response.statusCode;
      try {
        jsonBody = JSON.parse(body)
        jsonBody['games'].forEach( function(gameData, index, array) {
          var championId = gameData['championId'];
          var stats      = gameData['stats'];
          var kills      = stats['championsKilled'] || 0;
          var deaths     = stats['numDeaths']       || 0;
          var assists    = stats['assists']         || 0;
          var kdaRatio   = deaths == 0 ? math.round(kills + assists, 3) : math.round((kills + assists)/deaths, 3);
          gameStats.push({champion_id: championId, kills: kills, deaths: deaths, assists: assists, kda_ratio: kdaRatio});
        });
      } catch(e) {
        statusCode = 503;
      }

      callback(statusCode, gameStats);
    });
  }
};

module.exports = Summoner;
