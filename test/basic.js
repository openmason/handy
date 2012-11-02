var handy=require('..');
var assert=require('assert');
var path = require('path');

// verify basic functions
// - getVersion
// - getHome
describe('basic', function() {
  before(function(done) {
    done();
  });
  describe('getVersion', function() {
    it('should return the correct version number', function(done) {
      var ver = handy.getVersion(path.join(__dirname,'..'));
      assert.equal(ver, "0.0.2");
      done();
    });
    it('should return empty - no package.json found', function(done) {
      var ver = handy.getVersion();
      assert.equal(ver, "");
      done();
    });
  });
});
