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
    })

    describe('statsDecorator Function', function() {
      let fixture = fixtures[0];
      let statisticsObj = statistics[0];

      it('Should add a \'stats\' property to test data', function() {
        myFunc.statsDecorator(fixture, statisticsObj);
        expect(fixture).to.have.ownPropertyDescriptor('stats');
      })
      it('Should add a \'ranking\' property to test data', function() {
        expect(fixture).to.have.ownPropertyDescriptor('ranking');
      })
      it('Should add all relevant properies to the stats object', function() {
        expect(fixture.stats).to.have.ownPropertyDescriptor('goals');
        expect(fixture.stats).to.have.ownPropertyDescriptor('numShotsOnGoal');
        expect(fixture.stats).to.have.ownPropertyDescriptor('saves');
        expect(fixture.stats).to.have.ownPropertyDescriptor('possDiff');
      })
    })


  })
})