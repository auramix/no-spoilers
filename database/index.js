var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/fixture_rankings', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.on('error', console.error.bind(console, 'connection error:'));

// Schema-less
var matchSchema = new mongoose.Schema({
  league_id: Number,
  homeTeam: {},
  awayTeam: {},
  ranking: Number
});
var Match = db.model('Match', matchSchema);

var fixturesSchema = new mongoose.Schema({
  competition: Number,
  date: String,
  fixtures: [matchSchema]
});

var Fixtures = db.model('Fixtures', fixturesSchema);


module.exports = {
  Match,
  Fixtures
};