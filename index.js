const fs = require('fs');
const http = require('http');
const request = require('request');
const parser = require('xml2json');
const express = require('express');
const app = express();


app.get('/patent/:filenum\.json',function (req,res) {
    // Browser: http://localhost:3090/patent/US20170351222A1-20171207.json
    // Source: http://68.233.251.32/patentappdata/descriptions/I20171207-xml/US20170351222A1-20171207.XML

    request.get('http://68.233.251.32/patentappdata/descriptions/I20171207-xml/US20170351333A1-20171207.XML', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var xml = body;

            // 
            xml = xml.replace(/\"/g,'\"'); 
            xml = xml.replace(/\'/g,"\'");
        
            // convert XML to JSON
            var json = parser.toJson(xml);

            res.setHeader("Content-Type", "application/json");
            res.send(`${json}`);
        }
    });

    // var xml = fs.readFileSync('data/US20170351222A1-20171207.XML','utf-8');
    
}); 
// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);