# handy
Bunch of common utility functions

## Functionality

  * getVersion
    * arguments
      1. path where package.json is present (optional)
    * returns - value of 'version' in package.json
    * example:
    
            var handy = require('handy');
            var ver = handy.getVersion(__dirname);

  * getUserHome
    * returns - home directory for current user (platform agnostic)
    
            var handy = require('handy');
            var home = handy.getUserHome();

  * getType
    * arguments
      1. object - for which type to be determined
    * returns - type of the object in lowercase ('number', 'array', 'object ...)
    
            var handy = require('handy');
            var xyz = [1,2,3];
            if(handy.getType(xyz)=='array') { 
              ... do something ...
            };

  * merge - shallow merge objects
    * arguments
      1. variable arguments, pass objects that needs to be merged
    * returns - merged object (or) {} 
    
            var handy = require('handy');
            var x = {a:1}, y={b:2}, z={a:4,c:5};
            var r = handy.merge(x,y,z);
            // r => {a:4, b:2, c:5}

  * deepMerge - merge objects, all hashes at all levels are merged (arrays left intact)
    * arguments
      1. variable arguments, pass objects that needs to be deep merged
    * returns - merged object (or) {} 
    
            var handy = require('handy');
            var x = {a:1,p:{a:5}}, y={b:2}, z={a:4,c:5,p:{a:3,b:11}};
            var r = handy.deepMerge(x,y,z);
            // r => {a:4, b:2, c:5, p:{a:3,b:11}}

## Install

    $ npm install handy
    # please include handy to your package.json

## Test cases
To execute full test cases

    $ make

