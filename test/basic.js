var handy=require('..');
var assert=require('assert');
var path = require('path');
var fs = require('fs');

// verify basic functions
// - getVersion
// - getUserHome
describe('basic', function() {
  before(function(done) {
    done();
  });
  describe('getVersion', function() {
    it('should return the correct version number', function(done) {
      var ver = handy.getVersion(path.join(__dirname,'..'));
      // lets read the json
      var doc = fs.readFileSync(path.join(__dirname,'..','package.json'), 'utf-8');
      var pkgObj = JSON.parse(doc);
      assert.equal(ver, pkgObj['version']);
      done();
    });
    it('should return empty - no package.json found', function(done) {
      var ver = handy.getVersion();
      assert.equal(ver, "");
      done();
    });
  });

  // -- getUserHome
  describe('getUserVersion', function() {
    it('should return the correct home', function(done) {
      var plat = process.platform;
      // if win32, should not return a home starting with '/'
      var userHome = handy.getUserHome();
      if(plat!='win32') {
        assert.equal(userHome.substring(0,1), '/');
      } else {
        assert.notEqual(userHome.substring(0,1), '/');
      }
      done();
    });
  });

});
