#!/usr/bin/env node

var fs = require('fs');
var gather = require('gather-stream');
var convert = require('./');

var fileName = process.argv[2];

var stream = fileName ?
  fs.createReadStream(fileName) :
  process.stdin;

stream.pipe( gather(function(err, buffer) {
  if (err) console.error(error);
  else if (!buffer.length) {
    console.log('supply input HTML as first argument or stdin');
  }
  else {
    process.stdout.write( convert(buffer) );
    process.stdout.write('\n');
  }
}));
