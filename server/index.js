const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('../database/controllers.js')
const models = require('../models/dataFormatting.js');
const axios = require('axios');
const config = require('./axios/get_config.js');
const port = 8000;

app.use(express.static('public'));
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// Checks DB for data
app.get('/fixtures/:comp/:date', function (req, res) {
  let comp = req.params.comp;
  let date = req.params.date;

  api.findFixtures(comp, date, function (err, result) {
    if (err) {
      res.status(500).send('Error with database find', err);
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  })
});

// Fetches data from our api, and reformats it before sending back to the client
app.get('/api/fixtures/:comp/:date', function (req, res) {
  let comp = req.params.comp;
  let date = req.params.date;
  let url = `/fixtures/league/${comp}/${date}`;

  axios.get(url, config)
    .then(response => { // Gets fixtures for given date and fetches events for each
      var fixtures = response.data.api.fixtures;

      var fixtureEvents = fixtures.map(fixture => {
        var fixtureId = fixture.fixture_id;
        var myurl = `/events/${fixtureId}`;
        return axios.get(myurl, config);
      });
      Promise.all(fixtureEvents)
        .then(fixtureEvents => { //* Adds match events to each fixture
          fixtures.forEach((fixture, i) => {
            fixture.events = fixtureEvents[i].data.api.events;
          })
          var fixtureStats = fixtures.map((fixture) => { //*Fetches stats and adds match stats to each fixture
            var fixtureId = fixture.fixture_id;
            var url = `/statistics/fixture/${fixtureId}`;
            console.log('Fixture url', url);
            return axios.get(url, config);
          })

          Promise.all(fixtureStats)
            .then(statistics => {

              statistics = statistics.map((stats) => {
                return stats.data.api.statistics;
              })

              //*The heavy lifting: data analysis of matches
              models.decorateFixtures(fixtures, statistics);
              let rankedMatches = models.rankMatches(fixtures);
              rankedMatches = models.formatMatches(rankedMatches);
              res.status(200).json(rankedMatches);
            })
            .catch(err => {
              res.status(500).send(err);
            })
        })
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

// Caches match analysis
app.post('/fixtures', function (req, res) {
  api.insertFixtures(req.body, function (err, result) {
    if (err) {
      res.status(500).send('Error with database insertion', err);
    } else {
      res.status(201).json(result);
    }
  })
})

app.listen(port, () => {
  console.log('App now listening on http://localhost:' + port);
});