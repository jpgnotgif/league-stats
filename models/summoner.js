var request = require('request');

var Summoner = function(name) {
  this.name = name.toLowerCase();
  this.requestId = function(callback) {
    var name = this.name;
    var baseUrl = `https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/${name}`;
    var queryParams = {
      api_key: "efecd9e1-f295-4690-9dde-0709791bccad"
    };
    request({url: baseUrl, qs: queryParams}, function(error, response, body) {
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
};

module.exports = Summoner;
