/**
 * handy - main file
 * MIT Licensed.
 */

// module dependencies
var fs   = require('fs');
var path = require('path');

/*
 * These are general utilities that are expected to run on the server 
 * side.
 */

/**
 * Get the version of current package in package.json
 * - packageDir - pass the path where package.json is present 
 *        or will look for package.json in __dirname/..
 * [return]  version value (or) empty string if not found
 */
exports.getVersion = function (packageDir) {
  var pathName = packageDir || path.join(__dirname,'..','..');
  // check if file is present
  pathName = path.join(pathName, 'package.json');
  if(fs.existsSync(pathName)) {
    return fs.readFileSync(pathName).toString().match(/"version"\s*:\s*"([\d.]+)"/)[1];
  }
  return "";
};

/**
 * Get user home directory.
 * - in case of win platform uses 'USERPROFILE'
 * - in case of other platforms uses 'HOME'
 */
exports.getUserHome = function() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

/**
 * Find type of a given object. 
 *
 * [returns] lower case type name like 'number', 'array', 'object' etc.,
 */
exports.getType = function(obj) {
  return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

/**
 * Merge (one level) objects and return back
 * the combined object.
 * -- pass in multiple arguments
 * on failure, would return an empty object ({})
 */
exports.merge = function() {
  var res = {};
  for(var i=0;i<arguments.length;i++) {
    if(this.getType(arguments[i]) != 'object') return res;
  }
  // merge all the objects to res
  // keys get overwritten from left to right
  for(i=0;i<arguments.length;i++) {
    var obj = arguments[i];
    Object.keys(obj).forEach(function (key) {
      res[key] = obj[key];
    });
  }
  return res;
};