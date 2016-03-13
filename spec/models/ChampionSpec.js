var nock = require('nock');
var Champion = require("../../models/Champion");

describe("Champion", function() {
  var champion;
  var championApiInterceptor;
  var actualImgUrl;
  var apiStatusCode;

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
    championApiInteceptor = nock("https://global.api.pvp.net")
                            .get(`/api/lol/static-data/na/v1.2/champion/${champion.id}`)
                            .query({champData: "image", api_key: process.env.leagueApiKey})
                            .reply(200, championApiResponse);

    var expectedUrl = "http://ddragon.leagueoflegends.com/cdn/6.5.1/img/champion/MasterYi.png";
    champion.requestImg( function(apiStatusCode, actualImgUrl) {
      expect(expectedUrl).toEqual(actualImgUrl);
      done();
    });

  });

  it("should handle invalid champion id", function(done) {
    notFoundResponse = {
      status_code: 404,
      message: "Not Found"
    }
    champion.id = 9000;
    championApiInterceptor = nock("https://global.api.pvp.net")
                  .get(`/api/lol/static-data/na/v1.2/champion/${champion.id}`)
                  .query({champData: "image", api_key: process.env.leagueApiKey})
                  .reply(404, notFoundResponse);

    champion.requestImg( function(apiStatusCode, actualImgUrl) {
      expect(actualImgUrl).toBeUndefined();
      done();
    });
  });

  it("should handle error on JSON parsing", function(done) {
    // missing image stanza
    invalidChampionApiResponse = {
      id: 11,
      key: "MasterYi",
      name: "Master Yi",
      title: "the Wuju Bladesman",
    }
    championApiInteceptor = nock("https://global.api.pvp.net")
                            .get(`/api/lol/static-data/na/v1.2/champion/${champion.id}`)
                            .query({champData: "image", api_key: process.env.leagueApiKey})
                            .reply(200, invalidChampionApiResponse);

    champion.requestImg( function(apiStatusCode, actualImgUrl) {
      expect(apiStatusCode).toEqual(503);
      expect(actualImgUrl).toBeUndefined();
      done();
    });
  });

  it("should handle case where API rate limit is exceeded", function(done) {
    rateLimitExceededResponse = {
      status_code: 429,
      message: "Rate limit exceeded"
    }
    championApiInterceptor = nock("https://global.api.pvp.net")
                  .get(`/api/lol/static-data/na/v1.2/champion/${champion.id}`)
                  .query({champData: "image", api_key: process.env.leagueApiKey})
                  .reply(429, rateLimitExceededResponse);

    champion.requestImg( function(apiStatusCode, actualImgUrl) {
      expect(apiStatusCode).toEqual(429);
      expect(actualImgUrl).toBeUndefined();
      done();
    });
  });

  it("should handle case where API is unavailable (http 503)", function(done) {
    apiUnavailableResponse = {
      status_code: 503,
      message: "Service Unavailable"
    }
    championApiInterceptor = nock("https://global.api.pvp.net")
                  .get(`/api/lol/static-data/na/v1.2/champion/${champion.id}`)
                  .query({champData: "image", api_key: process.env.leagueApiKey})
                  .reply(503, apiUnavailableResponse);

    champion.requestImg( function(apiStatusCode, actualImgUrl) {
      expect(apiStatusCode).toEqual(503);
      expect(actualImgUrl).toBeUndefined();
      done();
    });
  });
});
