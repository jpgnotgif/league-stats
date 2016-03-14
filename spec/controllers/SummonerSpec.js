var request  = require('request');
var nock     = require('nock');
var app      = require("../../bin/www");
var baseUrl  = "http://localhost:3000/summoner/stats";

describe("Summoner routes", function() {
  describe("GET /stats", function() {
    describe("username exists", function() {
      it("returns 200 and renders when response is parsable", function(done) {
        request.get({url: baseUrl, qs: {name: "nope"}}, function(error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });
    });

    describe("username does not exist", function() {
      it("returns 404", function(done) {
        request.get({url: baseUrl, qs: {name: "nopexys"}}, function(error, response, body) {
          expect(response.statusCode).toBe(404);
          done();
        });
      });
    });

    describe("response cannot be parsed", function() {
      it("returns 503", function(done) {
        request.get({url: baseUrl, qs: {name: "nopexys"}}, function(error, response, body) {
          expect(response.statusCode).toBe(404);
          done();
          app.closeServer();
        });
      });
    });
  });
});
