var handy=require('..');
var assert=require('assert');

// verify object functions
// - getType
// - merge
// - deepMerge
describe('object', function() {
  before(function(done) {
    done();
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
    it('replace array', function(done) {
      var x = {a:[1,2,3]}, y={a:[4,5]};
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

  // -- deepMerge
  describe('deepMerge', function() {
    it('one empty', function(done) {
      var x = {}, y={a:'hi'};
      assert.deepEqual(handy.deepMerge(x,y), handy.merge(x,y));
      done();
    });
    it('first level check', function(done) {
      var x = {a:1,b:3}, y={a:'hi'};
      assert.deepEqual(handy.deepMerge(x,y), {a:'hi',b:3});
      done();
    });
    it('second level check - replace', function(done) {
      var x = {a:1,lvl2:{a:3,b:5}}, y={lvl2:{a:45}};
      var r = {a:1,lvl2:{a:45,b:5}};
      assert.deepEqual(handy.deepMerge(x,y), r);
      done();
    });
    it('second level check - addition', function(done) {
      var x = {a:1,lvl2:{a:3,b:5}}, y={lvl2:{c:45}};
      var r = {a:1,lvl2:{a:3,b:5,c:45}};
      assert.deepEqual(handy.deepMerge(x,y), r);
      done();
    });
    it('second level check - array replace', function(done) {
      var x = {a:1,lvl2:{a:3,b:5,c:[1,2,3]}}, y={lvl2:{c:[4,5],d:'hi'}};
      var r = {a:1,lvl2:{a:3,b:5,c:[4,5],d:'hi'}};
      assert.deepEqual(handy.deepMerge(x,y), r);
      done();
    });
    it('third level check - replace', function(done) {
      var x = {a:1,lvl2:{a:3,b:5,lvl3:{p:9,q:8}}}, y={lvl2:{lvl3:{q:1}}};
      var r = {a:1,lvl2:{a:3,b:5,lvl3:{p:9,q:1}}};
      assert.deepEqual(handy.deepMerge(x,y), r);
      done();
    });
    it('third level check - addition', function(done) {
      var x = {a:1,lvl2:{a:3,b:5,lvl3:{p:9,q:8}}}, y={lvl2:{lvl3:{z:'new a'}}};
      var r = {a:1,lvl2:{a:3,b:5,lvl3:{p:9,q:8,z:'new a'}}};
      assert.deepEqual(handy.deepMerge(x,y), r);
      done();
    });
  });

});
