var assert = require('assert');
var should = require('should');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        [1,2,3].indexOf(5).should.be.exactly(-1);
        // [1,2,3].indexOf(0).should.be.exactly(-1);
      });
    });
  });
  

