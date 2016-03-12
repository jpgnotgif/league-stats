var request = require('request')

var queryParams = {
  api_key: "efecd9e1-f295-4690-9dde-0709791bccad"
};

var championImgCdnUrl = "http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion";
var Champion = function(id) {
  this.id = id;
  this.requestImg = function(callback) {
    queryParams["champData"] = "image";
    var baseUrl = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + this.id;
    console.log(baseUrl);
    request( {url: baseUrl, qs: queryParams}, function(error, response, body) {
      jsonBody = JSON.parse(body);
      var imgName = jsonBody["image"]["full"];
      var imgUrl = championImgCdnUrl + "/" + imgName;


      callback(imgUrl);
    });
  }
}

module.exports = Champion;
