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

// Checks DB for data, and calls our stats api if not
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

// Calls stats api
app.get('/api/fixtures/:comp/:date', function (req, res) {
  let comp = req.params.comp;
  let date = req.params.date;
  // let url = `/fixtures/league/${comp}/${date}`;
  let url = `/events/`;

  axios.get(url, config)
    .then(response => { // Gets fixtures for given date and fetches events for each
      var fixtures = response.data.api.fixtures;

      var fixtureEvents = fixtures.map(fixture => {
        // console.log(fixture);
        let fixtureId = fixture.fixture_id;
        let url = `/events/${fixtureId}`;
        console.log(url, config);
        return axios.get(url, config);
      });
      // console.log('getting events', fixtureEvents);
      return Promise.all(fixtureEvents);
    })
    .then(results => {
      res.status(200).send(results.data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  // .then(fixtureEvents => { // Adds match events to each fixture
  //   console.log('FIXTURES', fixtures)
  //   fixtures.forEach((fixture, i) => {
  //     fixture.events = fixtureEvents[i].data.api.events;
  //   })
  //   console.log('FIXTURES W/EVENTS', fixtures)
  //   return fixtures;
  // })
  // .then(fixtures => {
  //   var fixtureStats = fixtures.map(() => {
  //     let fixtureId = fixture.fixtureId;
  //     let url = `/statistics/fixture/${fixtureId}`;
  //     return axios.get(url, config);
  //   })
  //   console.log('getting stats');
  //   return Promise.all(fixtureStats);
  // })
  // .then(statistics => {
  //   let stats = statistics.data.api.statistics;
  //   models.decorateFixtures(fixtures, stats);
  //   let rankedMatches = models.rankMatches(fixtures);
  //   rankedMatches = models.formatMatches(rankedMatches);
  //   res.status(200).json(rankedMatches);
  // })

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