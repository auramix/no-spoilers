var db = require('./index.js');

var findFixtures = function (competition, date, cb) {
  console.log(competition, date);
  db.Fixtures.findOne({
    competition: competition,
    date: date
  }, function (err, fixtures) {
    if (err) {
      console.log('Mongo FindOne Error: ', err);
      cb(err);
    } else {
      cb(err, fixtures)
    }
  })
}

var insertFixtures = function (fixtures, cb) {
  db.Fixtures.create(fixtures, function (err, result) {
    if (err) {
      console.log('Mongo Insert Error: '.err);
      cb(err);
    } else {
      cb(err, result);
    }
  })
}

module.exports = {
  findFixtures,
  insertFixtures
};