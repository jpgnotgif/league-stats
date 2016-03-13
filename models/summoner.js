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
    var baseUrl = `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${name}`;

    request( {url: baseUrl, qs: queryParams} , function(error, response, body) {
      var id;
      if (!error && response.statusCode == 200) {
        jsonBody = JSON.parse(body);
        id = jsonBody[name]['id'];
      } else {
          id = undefined;
      }
      callback(id);
    });
  };

  this.requestStats = function(callback) {
    var id = this.id;

    // TODO: Productionize!
    var baseUrl = `https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/${id}/recent`;

    var gameStats = [];
    var championData = {};

    request( {url: baseUrl, qs: queryParams}, function(error, response, body) {
      // TODO: error handling! what happens is body is undefined of parse call fails?
      jsonBody = JSON.parse(body)
      jsonBody['games'].forEach( function(gameData, index, array) {
        // TODO: error handling! what happens if these values are undefined?
        var championId = gameData['championId'];
        var stats      = gameData['stats'];
        var kills      = stats['championsKilled'] || 0;
        var deaths     = stats['numDeaths']       || 0;
        var assists    = stats['assists']         || 0;
        var kdaRatio   = deaths == 0 ? math.round(kills + assists, 3) : math.round((kills + assists)/deaths, 3);
        gameStats.push({champion_id: championId, kills: kills, deaths: deaths, assists: assists, kda_ratio: kdaRatio});
      })
      callback(gameStats);
    });
  }
};

module.exports = Summoner;
