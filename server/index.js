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
app.use(bodyParser.urlencoded())

// Checks DB for data, and calls our stats api if not
app.get('/fixtures', function (req, res) {
  let comp = req.params.competition;
  let date = req.params.date;

  api.findFixtures(comp, date, function (err, result) {
    if (err) {
      res.status(500).send('Error with database find', err);
    } else if (result !== null) {
      res.status(200).json(result);
    } else {
      axios.get('/api/fixtures', {
          params: {
            competition: comp,
            date: date
          }
        })
        .then(response => {
          res.status(200).json(response.data)
        })
        .catch(err => {
          res.status(500).send('Error calling api', err);
        })
    }
  })
});

// Calls stats api
app.get('/api/fixtures', function (req, res) {
  let comp = req.params.competition;
  let date = req.params.date;
  let url = `/fixtures/league/${comp}/${date}`;

  axios.get(url, config)
    .then(response => { // Gets fixtures for given date and fetches events for each
      var fixtures = response.data.api.fixtures;

      var fixtureEvents = fixtures.map(fixture => {
        let fixtureId = fixture.fixture_id;
        let url = `/events/${fixtureId}`;
        return axios.get(url, config);
      });

      return Promise.all(fixtureEvents);
    })
    .then(fixtureEvents => { // Adds match events to each fixture
      console.log('Event values for fixtures', fixtureEvents);

      fixtures.forEach((fixture, i) => {
        fixture.events = fixtureEvents[i].data.api.events;
      })
      return fixtures;
    })
    .then(fixtures => {
      var fixtureStats = fixtures.map(() => {
        let fixtureId = fixture.fixtureId;
        let url = `/statistics/fixture/${fixtureId}`;
        return axios.get(url, config);
      })
      return Promise.all(fixtureStats);
    })
    .then(statistics => {
      let stats = statistics.data.api.statistics;
      models.decorateFixtures(fixtures, stats);
      let rankedMatches = models.rankMatches(fixtures);
      rankedMatches = models.formatMatches(rankedMatches);
      res.status(200).json(rankedMatches);
    })
    .catch(err => {
      res.status(500).send('Error: api get - ', err);
    })
})

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