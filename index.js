/**
 * handy - main file
 * MIT Licensed.
 */

// module dependencies
var fs   = require('fs');
var path = require('path');

/**
 * Get the version of current package in package.json
 * - packageDir - pass the path where package.json is present 
 *        or will look for package.json in ../..
 * [return]  version value (or) empty string if not found
 */
exports.getVersion = function (packageDir) {
  var pathName = packageDir || path.join("..","..");
  // check if file is present
  pathName = path.join(pathName, 'package.json');
  if(fs.existsSync(pathName)) {
    return fs.readFileSync(pathName).toString().match(/"version"\s*:\s*"([\d.]+)"/)[1];
  }
  return "";
};

/**
 * Get user home directory.
 * - in case of win uses 'USERPROFILE'
 * - in case of other platforms uses 'HOME'
 */
exports.getUserHome = function() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};
