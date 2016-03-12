var request = require('request');

var Summoner = function(name) {
  this.name = name.toLowerCase();
  this.baseUrl = "https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/"
  this.apiKey = "efecd9e1-f295-4690-9dde-0709791bccad"

  this.setId = function() {
    var url = baseUrl + this.name + apiKey;
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {

        jsonBody = JSON.parse(body);

        console.log(jsonBody[this.name]);

      } else {

      }
    });
  }
};


module.exports = Summoner;
