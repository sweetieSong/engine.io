var engine = require('engine.io');
var httpServer = require('http').createServer();
var port = 8000;

// create static server to host static content (like js)
var staticServerProvider = require('node-static'),
	htmlServer = new(staticServerProvider.Server)('./public'),
	jsServer = new(staticServerProvider.Server)('./node_modules');

var enabledTransports = ['polling']; 

// start the engine.io server and the http server
var server = new engine.Server({ transports: enabledTransports });
httpServer.listen(port);
console.log("Server started on port " + port);

// separate handling of engine.io commands and http commands
var httpRequestHandler = function (request, response) {
	var uri = request.url.substr(1).split('/');
	console.log(uri);

	if (uri[0] !== 'engine.io' || uri[0] == '') {

		// serve node modules from npm
		if (uri[0] == 'mocha' || uri[0] == 'engine.io-client' || uri[0] == 'assert'){
			request.addListener('end', function () {
				jsServer.serve(request, response);
			});
		} 

		// serve index.html
		else {
			request.addListener('end', function () {
				htmlServer.serve(request, response);
			});
		}
  }

  // serve nodejs
  else if (uri[0] == 'engine.io') {
  	server.handleRequest(request, response);
  }
};

// set up request event handler
httpServer.on('request', httpRequestHandler);

// engineio handlers
server.on('connection', function (client) {
	client.send("HELO");

	client.on('message', function(message){
		console.log("received reply: " + message);
	});
});
