var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fixture_rankings', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Schema-less
var matchSchema = new mongoose.Schema({
  match: {}
});
var Match = mongoose.model('Match', matchSchema);

var fixturesSchema = new mongoose.Schema({
  competition: Number,
  date: String,
  fixtures: [matchSchema]
});

var Fixtures = mongoose.model('Fixtures', fixturesSchema);


module.export = {
  Match,
  Fixtures
};