#! /usr/bin/env node

var jetpack = require('fs-jetpack');
var parse = require('./parse.js');

var userArgs = process.argv.slice(2);
var fileIn = userArgs[0];
var fileOut = userArgs[1];
var fileContents = jetpack.read(fileIn);

var ret = parse(fileContents);

if (ret[0] == true) {
  jetpack.write(fileOut, ret[1]);
  console.log(`Compiled ${fileIn} to ${fileOut}`);
}
else {
  console.log('Was not compiled due to errors.');
}
