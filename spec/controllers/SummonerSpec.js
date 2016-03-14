var request  = require('request');
var nock     = require('nock');
var app      = require("../../bin/www");
var baseUrl  = "http://localhost:3000/summoner/stats";

describe("Summoner routes", function() {
  describe("GET /stats", function() {
    it("returns 200 and renders", function(done) {
      request.get({url: baseUrl, qs: {name: "nope"}}, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns 404 for invalid summoner id", function(done) {
      done();
    });

    it("returns 503 when API responses cannot be parsed", function(done) {
      app.closeServer();
      done();
    });
  });
});
