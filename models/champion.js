var request = require('request')

var queryParams = {
  api_key: process.env.leagueApiKey
};

var championImgCdnUrl = "http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion";
var Champion = function(id) {
  this.id = id;
  this.requestImg = function(callback) {
    queryParams["champData"] = "image";
    var baseUrl = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + this.id;
    request( {url: baseUrl, qs: queryParams}, function(error, response, body) {
      jsonBody = JSON.parse(body);
      var imgName = jsonBody["image"]["full"];
      var imgUrl = championImgCdnUrl + "/" + imgName;
      callback(imgUrl);
    });
  }
}

module.exports = Champion;
