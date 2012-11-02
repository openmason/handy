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

  // -- getType
  describe('getType', function() {
    it('object', function(done) {
      assert.equal(handy.getType({}), 'object');
      assert.equal(handy.getType({'a':5}), 'object');
      assert.equal(handy.getType({'a':[1,2,3]}), 'object');
      var tmp={"alpha":"beta"};
      assert.equal(handy.getType(tmp), 'object');
      done();
    });
    it('array', function(done) {
      assert.equal(handy.getType([]), 'array');
      assert.equal(handy.getType([{'a':5}]), 'array');
      assert.equal(handy.getType([1,2,3]), 'array');
      var tmp=[{"alpha":"beta"}];
      assert.equal(handy.getType(tmp), 'array');
      done();
    });
    it('regex', function(done) {
      assert.equal(handy.getType(/./), 'regexp');
      assert.equal(handy.getType(/[{'a':5}]/), 'regexp');
      done();
    });
    it('regex', function(done) {
      assert.equal(handy.getType(123), 'number');
      assert.equal(handy.getType(123+45), 'number');
      done();
    });
  });

  // -- merge
  describe('merge - shallow', function() {
    it('one empty', function(done) {
      var x = {}, y={a:'hi'};
      assert.deepEqual(handy.merge(x,y), y);
      done();
    });
    it('both empty', function(done) {
      var x = {}, y={};
      assert.deepEqual(handy.merge(x,y), y);
      done();
    });
    it('invalid objects', function(done) {
      var x = {}, y=[1,2,3];
      assert.deepEqual(handy.merge(x,y), x);
      done();
    });
    it('replace string', function(done) {
      var x = {a:'hi'}, y={a:'there'};
      assert.deepEqual(handy.merge(x,y), y);
      done();
    });
    it('replace object', function(done) {
      var x = {a:{x:34}}, y={a:{a:'there',b:'hi'}};
      assert.deepEqual(handy.merge(x,y), y);
      done();
    });
    it('merge object', function(done) {
      var x = {a:'123', b:33}, y={a:12, x:45}, z={a:12,b:33,x:45};
      assert.deepEqual(handy.merge(x,y), z);
      done();
    });
    it('three objects - replace', function(done) {
      var x = {a:'123', b:33}, y={a:12}, z={a:19,b:15,x:45};
      assert.deepEqual(handy.merge(x,y,z), z);
      done();
    });
    it('three objects - merge', function(done) {
      var x = {a:'123', b:33}, y={a:12, c:4}, z={y:34,p:4}, r={a:12,b:33,c:4,y:34,p:4};
      assert.deepEqual(handy.merge(x,y,z), r);
      done();
    });
  });

});
