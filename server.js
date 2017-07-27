var merge = require('package-merge')
var fs = require('fs');

var dst = fs.readFileSync('discord/package.json');
var src = fs.readFileSync('web/package.json');
fs.writeFile("package.json", merge(dst,src));