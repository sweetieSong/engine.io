var arguments = process.argv.splice(2);
if (arguments.length == 0){
  console.log("Need to provide url\nTry: node client.js [server url]");
  process.exit(1);
}

var express = require('express');
var util    = require('util');
var port = 8080;

// create an express webserver
var app = express.createServer(
  express.logger(),
  express.static(__dirname + '/public'),
  express.bodyParser()
);

app.listen(port, function() {
  console.log("Client started. Listening on " + port);
});

app.server = arguments[0];
app.num_tests = 1;

function _handle(req, res){
  res.render('index.ejs', {
    layout:    false,
    req:       req,
    app:       app 
  });
}

app.get('/', _handle);
