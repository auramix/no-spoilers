var expect = require('chai').expect;
var myFunc = require('../models/dataFormatting.js');

describe('Test test', function() {
  describe('My test', function() {
    it('should pass this simple test', function() {
      expect(myFunc.rankMatches).to.be.an('function');
      expect(myFunc.rankMatches).to.not.be.an('object');
    })
  })
})