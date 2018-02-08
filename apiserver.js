const fs = require('fs');
const http = require('http');
const request = require('request');
const parser = require('xml2json');
const express = require('express');
const app = express();

/* ---------------------------------------------------------------------- 
    /GET /patents/topic/:my+topic

    Browser: http://localhost:3090/patents/topic/crypto

    Browser #2: http://localhost:3090/patents/topic/Virtual+Reality

    Source example: http://api.freshpatents.com/json/get.php?topic=crypto
    
    Filename example: US20170351222A1-20171207
---------------------------------------------------------------------- */    
    

app.get('/patents/topic/:topic', function (req,res) {
    var topicQuery = req.params.topic.toLowerCase();
    topicQuery = topicQuery.replace(/\+/g,'-')

    request.get('http://api.freshpatents.com/json/get.php?topic=' + topicQuery, function (error, response, body) {
  
        console.log('STATUS: ' + response.statusCode);
        if (!error && response.statusCode == 200) {

            var json = body;
            res.setHeader("Content-Type", "application/json");
            res.send(`${json}`);

        } else {
            // return error + ' ' + response.statusCode;
        }
    });
});


/* ----------------------------------------------------------------------
    
    /GET /patent/:filenum

    Browser: http://localhost:3090/patent/US20170351222A1-20171207.json

    Source example: http://68.233.251.32/patentappdata/descriptions/I20171207-xml/US20170351222A1-20171207.XML

    Filename example: US20170351222A1-20171207

---------------------------------------------------------------------- */    


app.get('/patent/:filenum',function (req,res) {

    var fullFilename = req.params.filenum;
    var arrFilename = fullFilename.split('-');
    var numFilename = arrFilename[0];
    var ymdFilename = arrFilename[1];

    request.get('http://68.233.251.32/patentappdata/descriptions/I' + ymdFilename + '-xml/' + numFilename + '-' + ymdFilename + '.XML', function (error, response, body) {
        console.log('STATUS: ' + res.statusCode);
        if (!error && response.statusCode == 200) {
            var xml = body;
            
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