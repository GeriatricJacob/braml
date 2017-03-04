#! /usr/bin/env node

var jetpack = require('fs-jetpack');
var parse = require('./parse.js');

var userArgs = process.argv.slice(2);
var fileIn = userArgs[0];
var fileOut = userArgs[1];
var fileContents = jetpack.read(fileIn);

jetpack.write(fileOut, parse(fileContents));
console.log(`Compiled ${fileIn} to ${fileOut}`);
