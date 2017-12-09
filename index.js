const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
const parser = require('xml2json');

app.get('/patent/:filenum\.json',function (req,res) {
    // Browser: http://localhost:3090/patent.json

    var xml = fs.readFileSync('data/US20170351222A1-20171207.XML','utf-8');
    
    xml = xml.replace(/\"/g,'\"'); 
    xml = xml.replace(/\'/g,"\'");

    // convert XML to JSON
    var json = parser.toJson(xml); 

    res.setHeader("Content-Type", "application/json");
    res.send(`${json}`);
}); 
// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);