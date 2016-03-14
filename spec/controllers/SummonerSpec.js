var request  = require('request');
var nock     = require('nock');
var summoner = require("../../controllers/summoner");
var baseUrl  = "http://localhost:3000/summoner";

describe("Summoner routes", function() {
  describe("GET /stats", function() {
    it("returns 200 and renders", function(done) {
      done();
    });

    it("returns 404 for invalid summoner id", function(done) {
      done();
    });

    it("returns 503 when API responses cannot be parsed", function(done) {
      done();
    });
  });
});
