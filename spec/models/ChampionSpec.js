var nock = require('nock');

describe("Champion", function() {
  var Champion = require("../../models/Champion");
  var champion;
  var championApi;
  var actualImgUrl;

  beforeEach(function() {
    champion = new Champion(11);
  });

  it("should fetch image url", function(done) {
    championApiResponse = {
      id: 11,
      key: "MasterYi",
      name: "Master Yi",
      title: "the Wuju Bladesman",
      image: {
        full: "MasterYi.png",
        sprite: "champion1.png",
        group: "champion",
        x: 432,
        y: 96,
        w: 48,
        h: 48
      }
    }
    championApi = nock("https://global.api.pvp.net")
                  .get(`/api/lol/static-data/na/v1.2/champion/${champion.id}`)
                  .query({champData: "image", api_key: process.env.leagueApiKey})
                  .reply(200, championApiResponse);

    var expectedUrl = "http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion/MasterYi.png";
    champion.requestImg( function(actualImgUrl) {
      expect(expectedUrl).toEqual(actualImgUrl);
      done();
    });
  });

  it("should handle invalid champion id", function(done) {
    /*
    notFoundResponse = {
      status_code: 404,
      message: "Not Found"
    }
    championApi = nock("https://global.api.pvp.net")
                  .get(`/api/lol/static-data/na/v1.2/champion/9000`)
                  .query({champData: "image", api_key: process.env.leagueApiKey})
                  .replyWithError(404, notFoundResponse);

    champion.requestImg( function(actualImgUrl) {
      expect(actualImgUrl).toBeUndefined();
    });
    */
  });

  it("should handle error on JSON parsing", function(done) {

  });
});
