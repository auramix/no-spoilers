var expect = require('chai').expect;
var myFunc = require('../models/dataFormatting.js');
var testData = require('../test_data.js');

describe('Unit tests', function() {
  describe('Data Format', function() {
    it('data should be in the correct format', function() {
      expect(testData.fixtures).to.be.an('array');
      expect(testData.statistics).to.be.an('array');
    })
  })
  describe('Data formatting functions', function() {
    const cleanFixtures = testData.fixtures;
    const cleanStatistics = testData.statistics;

    var fixtures = testData.fixtures;
    var statistics = testData.statistics;

    beforeEach(function() {
      fixtures = cleanFixtures;
      statistics = cleanStatistics;
    });

    describe('statsDecorator Function', function() {
      let fixture = fixtures[0];
      let statisticsObj = statistics[0];
      myFunc.statsDecorator(fixture, statisticsObj);

      it('Should add a \'stats\' property to test data', function() {
        expect(fixture).to.have.ownPropertyDescriptor('stats');
      });
      it('Should add a \'ranking\' property to test data', function() {
        expect(fixture).to.have.ownPropertyDescriptor('ranking');
      });
      it('Should add all relevant properties to the stats object', function() {
        expect(fixture.stats).to.have.ownPropertyDescriptor('goals');
        expect(fixture.stats).to.have.ownPropertyDescriptor('numShotsOnGoal');
        expect(fixture.stats).to.have.ownPropertyDescriptor('saves');
        expect(fixture.stats).to.have.ownPropertyDescriptor('possDiff');
      });
      it('All property values should be of the correct type', function() {
        expect(fixture.stats.goals).to.be.an('number');
        expect(fixture.stats.numShotsOnGoal).to.be.an('number');
        expect(fixture.stats.saves).to.be.an('number');
        expect(fixture.stats.possDiff).to.be.an('number');
      });
    });

    describe('numResultChanges function', function() {
      let fixture = fixtures[0];
      let statisticsObj = statistics[0];
      myFunc.statsDecorator(fixture, statisticsObj);
      myFunc.numResultChanges(fixture);

      it('Should add all relevant properties to the stats object', function() {
        expect(fixture.stats).to.have.ownPropertyDescriptor('resultChanges');
        expect(fixture.stats).to.have.ownPropertyDescriptor('numEvents');
      });
      it('All property values should be of the correct type', function() {
        expect(fixture.stats.resultChanges).to.be.an('number');
        expect(fixture.stats.numEvents).to.be.an('number');
      });
    });

    describe('decorateFixtures function', function() {
      let fixture = fixtures[0];
      let statisticsObj = statistics[0];
      myFunc.decorateFixtures(fixtures, statistics)

      it('Should add all relevant properties to the stats object', function() {
        expect(fixture.stats).to.have.ownPropertyDescriptor('resultChanges');
        expect(fixture.stats).to.have.ownPropertyDescriptor('numEvents');
        expect(fixture.stats).to.have.ownPropertyDescriptor('goals');
        expect(fixture.stats).to.have.ownPropertyDescriptor('numShotsOnGoal');
        expect(fixture.stats).to.have.ownPropertyDescriptor('saves');
        expect(fixture.stats).to.have.ownPropertyDescriptor('possDiff');
      });
      it('All property values should be of the correct type', function() {
        expect(fixture.stats.resultChanges).to.be.an('number');
        expect(fixture.stats.numEvents).to.be.an('number');
        expect(fixture.stats.goals).to.be.an('number');
        expect(fixture.stats.numShotsOnGoal).to.be.an('number');
        expect(fixture.stats.saves).to.be.an('number');
        expect(fixture.stats.possDiff).to.be.an('number');
      });
    });
  });

  describe('Data ranking', function() {
    const cleanFixtures = testData.fixtures;
    const cleanStatistics = testData.statistics;

    var fixtures = testData.fixtures;
    var statistics = testData.statistics;

    beforeEach(function() {
      fixtures = cleanFixtures;
      statistics = cleanStatistics;
    });

    describe('rankMatches function', function() {
      myFunc.decorateFixtures(fixtures, statistics);
      let rankedMatches = myFunc.rankMatches(fixtures);

      it('Should create a \'ranking\' property with an object for a value', function() {
        expect(rankedMatches[0]).to.have.ownPropertyDescriptor('ranking');
        expect(rankedMatches[0].ranking).to.be.an('number');
        console.log('Processed match data: ', rankedMatches);
      });
    })
  })
})