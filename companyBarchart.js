var fs = require('fs');
var issuerSample = fs.readFileSync('./issuerSample.json', 'utf-8', 'r+');
issuerSample = JSON.parse(issuerSample);
