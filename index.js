const express = require('express');
const fs = require('fs');
const http = require('http');
const app = express();
const parser = require('xml2json');

var xml = fs.readFileSync('short-data/US20170351222A1-20171207.XML','utf-8');

xml = xml.replace(/\"/g,'\"');
xml = xml.replace(/\'/g,"\'");

console.log(xml);


// xml to json 
var json = parser.toJson(xml);


app.get('/test.json',function (req,res) {
    // http://localhost:3090/test.json

    res.setHeader("Content-Type", "application/json");
    res.send(`${json}`);
});
// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);