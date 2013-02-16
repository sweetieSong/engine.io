/**
* Module dependencies.
*/
var express = require('express');
var engine = require('engine.io');
var port = 8000;

/**
* Create app.
*/
app = express.createServer(
  express.bodyParser(), 
  express.static('public')
);

/**
* Listen.
*/
app.listen(port, function(){
	console.log("Server Started. Listening on " + port);
});

var server = engine.listen(app);

server.on('connection', function(socket){
  server.on('helo-client', function(name){
    server.send('helo-server', "welcome to my server!");
  });
});
