var fs = require('fs');
var institutionSample = fs.readFileSync('./institutionSample.json', 'utf-8', 'r+');
var issuerSample = fs.readFileSync('./issuerSample.json', 'utf-8', 'r+');
institutionSample =JSON.parse(institutionSample);
issuerSample = JSON.parse(issuerSample);
console.log(institutionSample.success)
console.log(institutionSample.data[1].cik)