var request  = require('request');
var nock     = require('nock');
var app      = require("../../bin/www");
var baseUrl  = "http://localhost:3000/summoner/stats";

var Summoner = require("../../models/summoner");
var summonerApiInterceptor;
var summonerMetadataResponse;
var idResponse;
var statsResponse;
var name;


describe("Summoner routes", function() {
  describe("GET /stats", function() {
    describe("username exists", function() {
      it("returns 200 and renders when response is parsable", function(done) {
        name = "valid-user";
        idResponse = {
          "valid-user": {
            id: 2,
            name: "valid-user",
            profileIconId: 1105,
            summonerLevel: 30,
            revisionDate: 1457657390000
          }
        };
        summonerApiInteceptor = nock("https://na.api.pvp.net")
                                .get(`/api/lol/na/v1.4/summoner/by-name/${name}`)
                                .query({api_key: process.env.leagueApiKey})
                                .reply(200, idResponse);

        statsApiInteceptor = nock("https://na.api.pvp.net")
                                .get(`/api/lol/na/v1.3/game/by-summoner/2/recent`)
                                .query({api_key: process.env.leagueApiKey})
                                .reply(200, {games: []});

        request.get({url: baseUrl, qs: {name: "valid-user"}}, function(error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });
    });

    describe("username does not exist", function() {
      it("returns 404", function(done) {
        name = "nope-not-found";
        idResponse = {
          status: {
            message: "Not Found",
            status_code: 404
          }
        };
        summonerApiInteceptor = nock("https://na.api.pvp.net")
                                .get(`/api/lol/na/v1.4/summoner/by-name/${name}`)
                                .query({api_key: process.env.leagueApiKey})
                                .reply(404, idResponse);

        request.get({url: baseUrl, qs: {name: name}}, function(error, response, body) {
          expect(response.statusCode).toBe(404);
          done();
        });
      });
    });

    describe("response cannot be parsed", function() {
      it("returns 503", function(done) {
        name = "nope-cannot-parse";
        idResponse = {
          "nope-cannot-parse": {
            id: 1,
            name: "nope-cannot-parse",
            profileIconId: 1105,
            summonerLevel: 30,
            revisionDate: 1457657390000
          }
        };
        summonerApiInteceptor = nock("https://na.api.pvp.net")
                                .get(`/api/lol/na/v1.4/summoner/by-name/${name}`)
                                .query({api_key: process.env.leagueApiKey})
                                .reply(200, idResponse);

        statsApiInteceptor = nock("https://na.api.pvp.net")
                                .get(`/api/lol/na/v1.3/game/by-summoner/1/recent`)
                                .query({api_key: process.env.leagueApiKey})
                                .reply(200, {});

        request.get({url: baseUrl, qs: {name: name}}, function(error, response, body) {
          expect(response.statusCode).toBe(503);
          done();
          app.closeServer();
        });
      });
    });
  });
});
