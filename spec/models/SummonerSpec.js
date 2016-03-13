var nock = require('nock');
var Summoner = require("../../models/Summoner");

describe("Summoner", function() {
  var summoner;
  var summonerApiInterceptor;
  var recentGamesInterceptor;
  var summonerName = "Eveloken";

  beforeEach(function() {
    summoner = new Summoner(summonerName);
  })


  it("should lower case summoner name", function() {
    expect(summoner.name).toEqual(summonerName.toLowerCase());
  });

  describe("ID request", function() {
    it("should complete successfully", function(done) {
      done();
    });

    it("should handle invalid summoner name", function(done) {
      done();
    });

    it("should handle JSON parsing errors", function(done) {
      done();
    });

    it("should handle case where API rate limit it exceeded", function(done) {
      done();
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
