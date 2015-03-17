#!/usr/bin/env node

var fs = require('fs');
var convert = require('./');

var fileName = process.argv[2];

if (!fileName) {
    throw new Error('supply input HTML file as first argument');
}

process.stdout.write(convert(fs.readFileSync(fileName)));
process.stdout.write("\n");
