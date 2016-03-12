var request = require('request');

var queryParams = {
  api_key: "efecd9e1-f295-4690-9dde-0709791bccad"
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
    var baseUrl = `https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/${id}/recent`;

    var gameStats = [];

    request( {url: baseUrl, qs: queryParams}, function(error, response, body) {

      jsonBody = JSON.parse(body)
      jsonBody['games'].forEach( function(gameData, index, array) {

        var stats = gameData['stats'];
        console.log(stats);

        var kills = stats['championsKilled'];
        var deaths = stats['numDeaths'];
        var assists = stats['assists'];

        // TODO: calculate kd ratio as (k+a)/d
        gameStats.push({kills: kills, deaths: deaths, assists: assists});

      })
      callback(gameStats);
    });
  }
};

module.exports = Summoner;
