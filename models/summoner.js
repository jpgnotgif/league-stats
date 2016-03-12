var request = require('request');
var math = require('mathjs');
var championModel = require('./champion');

// TODO: Productionize!
var queryParams = {
  api_key: "efecd9e1-f295-4690-9dde-0709791bccad"
};

var Summoner = function(name) {
  this.name = name.toLowerCase();

  this.requestId = function(callback) {
    var name = this.name;

    // TODO: Productionize!
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

    // REQUEST GAME STATS
    request( {url: baseUrl, qs: queryParams}, function(error, response, body) {
      jsonBody = JSON.parse(body)

      // EXTRACT ALL GAME STATS AND PUSH DATA TO ARRAY
      jsonBody['games'].forEach( function(gameData, index, array) {
        // TODO: error handling! what happens if these values are undefined?
        var championId = gameData['championId'];
        var stats      = gameData['stats'];
        var kills      = stats['championsKilled'];
        var deaths     = stats['numDeaths'];
        var assists    = stats['assists'];
        var kdaRatio   = math.round((kills + assists)/deaths, 3);

        gameStats.push({champion_id: championId, kills: kills, deaths: deaths, assists: assists, kda_ratio: kdaRatio});
      })


      //console.log(championData);
      callback(gameStats);

    });
  }
};

module.exports = Summoner;
