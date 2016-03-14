var nock = require('nock');
var Summoner = require("../../models/Summoner");

describe("Summoner", function() {
  var summoner;
  var summonerApiInterceptor;
  var recentGamesInterceptor;
  var apiStatusCode;
  var summonerName = "Eveloken";

  beforeEach(function() {
    summoner = new Summoner(summonerName);
  })

  it("should lower case summoner name", function() {
    expect(summoner.name).toEqual(summonerName.toLowerCase());
  });

  describe("ID request", function() {
    it("should complete successfully", function(done) {
      summonerMetadataResponse = {
        eveloken: {
          id: 72680640,
          name: "Eveloken",
          profileIconId: 1105,
          summonerLevel: 30,
          revisionDate: 1457657390000
        }
      };
      summonerApiInteceptor = nock("https://na.api.pvp.net")
                              .get(`/api/lol/na/v1.4/summoner/by-name/${summoner.name}`)
                              .query({api_key: process.env.leagueApiKey})
                              .reply(200, summonerMetadataResponse);

      summoner.requestId( function(apiStatusCode, summonerId) {
        expect(200).toEqual(apiStatusCode);
        expect(summonerId).toEqual(summonerMetadataResponse[summoner.name]['id']);
        done();
      });
    });

    it("should handle invalid summoner name", function(done) {
      notFoundResponse = {
        status: {
          message: "Not Found",
          status_code: 404
        }
      }
      summoner.name = summonerName + "-not-found";
      summonerApiInteceptor = nock("https://na.api.pvp.net")
                              .get(`/api/lol/na/v1.4/summoner/by-name/${summoner.name}`)
                              .query({api_key: process.env.leagueApiKey})
                              .reply(404, notFoundResponse);

      summoner.requestId( function(apiStatusCode, summonerId) {
        expect(404).toEqual(apiStatusCode);
        expect(summonerId).toBeUndefined();
        done();
      });
    });

    it("should handle JSON parsing errors", function(done) {
      invalidSummonerApiResponse = {
        name: "Eveloken",
      }
      summonerApiInteceptor = nock("https://na.api.pvp.net")
                              .get(`/api/lol/na/v1.4/summoner/by-name/${summoner.name}`)
                              .query({api_key: process.env.leagueApiKey})
                              .reply(200, invalidSummonerApiResponse);

      summoner.requestId( function(apiStatusCode, summonerId) {
        expect(503).toEqual(apiStatusCode);
        expect(summonerId).toBeUndefined();
        done();
      });
    });

    it("should handle case where API rate limit it exceeded", function(done) {
      rateLimitExceededResponse = {
        status_code: 429,
        message: "Rate limit exceeded"
      }
      summonerApiInteceptor = nock("https://na.api.pvp.net")
                              .get(`/api/lol/na/v1.4/summoner/by-name/${summoner.name}`)
                              .query({api_key: process.env.leagueApiKey})
                              .reply(429, rateLimitExceededResponse);
      summoner.requestId( function(apiStatusCode, summonerId) {
        expect(429).toEqual(apiStatusCode);
        expect(summonerId).toBeUndefined();
        done();
      });
    });

    it("should handle case where API is unavailable (http 503)", function(done) {
      done();
    });
  });

  describe("recent stats http request", function() {
    it("should complete successfully", function(done) {
      done();
    });

    it("should handle invalid summoner id", function(done) {
      done();
    });

    it("should handle JSON parsing", function(done) {
      done();
    });

    it("should handle case where API rate limit is exceeded", function(done) {
      done();
    });
  });

  describe("recent stats calculation", function() {
    it("should initialize values to 0", function(done) {
      done();
    });

    it("should calculate kda ratio for 0 deaths", function(done) {
      done();
    });

    it("should calculate kda ratio for >0 deaths", function(done) {
      done();
    });
  });
});
