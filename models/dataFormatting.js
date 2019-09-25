/* {data, ranking, stats: {
  resultChanges,
  goals,
  numEvents,
  numShotsOnGoal,
  possDiff,
  saves
}}*/

var rankMatches = function (matches) {
  let ranks = {
    'resultChanges': 40,
    'goals': 25,
    'numEvents': 10,
    'numShotsOnGoal': 10,
    'possDiff': 10,
    'saves': 5
  }

  let numOfMatches = matches.length;

  // Sort matches based on category rank and add appropriate number of ranking points to total;
  for (let prop in ranks) {
    let totalPossible = ranks[prop];
    let reduceBy = (totalPossible / numOfMatches);

    matches = matches.sort((a, b) => b.stats[prop] - a.stats[prop])
    for (let i = 0; i < numOfMatches; i += 1) {
      i === 0 ? matches[i].ranking += totalPossible : matches[i].ranking += (totalPossible - reduceBy * i);
    }
  }

  return matches.sort((a, b) => a.ranking - b.ranking)
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
    numResultChanges(fixture[i]);
  }
}

module.exports = {
  rankMatches,
  statsDecorator,
  numResultChanges,
  decorateFixtures
}