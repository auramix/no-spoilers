/* {data, ranking, stats: {
  resultChanges,
  goals,
  numEvents,
  numShotsOnGoal,
  possDiff,
  saves
}}*/
var formatMatches = function (matches) {
  let competition = matches[0].league_id;
  let date = matches[0].event_date.substring(0, 10)
  let fixtures = matches.map((fixture) => {
    return {
      'competition': competition,
      'homeTeam': fixture.homeTeam,
      'awayTeam': fixture.awayTeam,
      'ranking': fixture.ranking
    }
  })
  return {
    'competition': competition,
    'date': date,
    'fixtures': fixtures
  }
}

var rankMatches = function (matches) {

  // Weighted percantages
  let ranks = {
    'resultChanges': 40,
    'goals': 25,
    'numEvents': 15,
    'numShotsOnGoal': 10,
    'possDiff': 5,
    'saves': 5
  }

  let numOfMatches = matches.length;

  // Sort matches based on category rank and add appropriate number of ranking points to total;
  for (let prop in ranks) {
    let totalPossible = ranks[prop];
    let reduceBy = (totalPossible / numOfMatches);

    matches = matches.sort((a, b) => {
      return prop === 'possDiff' ? a.stats[prop] - b.stats[prop] : b.stats[prop] - a.stats[prop]
    })

    // If the ranked stat count equals that of the previous rank, we should attribute the same number of ranking points.
    let differentStatCount = 0;
    for (let i = 0; i < numOfMatches; i += 1) {
      let statsPropertyVal = matches[i]['stats'][prop];
      if (i === 0) {
        matches[i].ranking += totalPossible
      } else if (statsPropertyVal === matches[i - 1]['stats'][prop]) {
        matches[i].ranking += (totalPossible - reduceBy * differentStatCount);
      } else {
        differentStatCount += 1;
        matches[i].ranking += (totalPossible - reduceBy * differentStatCount);
      }
    }
  }

  return matches.sort((a, b) => b.ranking - a.ranking)
}

// Compiles match stats into one object and adds it to the data object
var statsDecorator = function (matchObj, statsObj) {
  matchObj.stats = {};
  matchObj.ranking = 0;

  let homeShots = statsObj['Shots on Goal']['home'] === '' ? 0 : parseInt(statsObj['Shots on Goal']['home']);
  let awayShots = statsObj['Shots on Goal']['away'] === '' ? 0 : parseInt(statsObj['Shots on Goal']['away']);

  let homeSaves = statsObj['Goalkeeper Saves']['home'] === '' ? 0 : parseInt(statsObj['Goalkeeper Saves']['home']);
  let awaySaves = statsObj['Goalkeeper Saves']['away'] === '' ? 0 : parseInt(statsObj['Goalkeeper Saves']['away']);


  matchObj.stats.goals = matchObj.goalsHomeTeam + matchObj.goalsAwayTeam;
  matchObj.stats.numShotsOnGoal = homeShots + awayShots;
  matchObj.stats.saves = homeSaves + awaySaves;
  matchObj.stats.possDiff = Math.abs(parseInt(statsObj['Ball Possession']['home'].slice(0, -1)) - parseInt(statsObj['Ball Possession']['away'].slice(0, -1)));
}


// function that determines how many times the winning state changed during match and decorates data object
var numResultChanges = function (matchObj) {
  let events = matchObj.events;
  let homeId = matchObj.homeTeam.team_id;
  let awayId = matchObj.awayTeam.team_id;
  let matchScore = [home, away] = [
    [homeId, 0],
    [awayId, 0]
  ];
  let previousState = 'draw';
  let resultChanges = 0;

  // Iterate through events
  for (var event of events) {
    // Tally goal events
    if (event.type === 'Goal') {
      if (event.detail === 'Normal Goal' || event.detail === 'Penalty' || event.detail === 'Own Goal') {
        if (event.team_id === homeId) {
          home[1] += 1;
        } else {
          away[1] += 1;
        }
      }

      // Change to previous game result?
      if (home[1] > away[1]) {
        if (previousState !== 'home') {
          previousState = 'home';
          resultChanges += 1;
        }
      } else if (away[1] > home[1]) {
        if (previousState !== 'away') {
          previousState = 'away';
          resultChanges += 1;
        }
      } else if (previousState !== 'draw') {
        previousState = 'draw';
        resultChanges += 1;
      }
    }
  }
  matchObj.stats.resultChanges = resultChanges;
  matchObj.stats.numEvents = events.length;
}

// function that decorates each fixture with data required to rank matches
var decorateFixtures = function (fixtures, stats) {
  for (let i = 0; i < fixtures.length; i += 1) {
    statsDecorator(fixtures[i], stats[i])
    numResultChanges(fixtures[i]);
  }
}

module.exports = {
  rankMatches,
  statsDecorator,
  numResultChanges,
  decorateFixtures,
  formatMatches
}