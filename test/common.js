
/**
 * Expose `eio` global.
 */

global.eio = require('../index');

/**
 * Expose client.
 */

global.eioc = require('engine.io-client');

/**
 * Expose `request` global.
 */

global.request = require('superagent');

/**
 * Expose `expect` global
 */

global.expect = require('expect.js');

/**
 * Listen shortcut that fires a callback on an epheemal port.
 */

global.listen = function (opts, fn) {
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }

  var e = global.eio.listen(null, opts, function () {
    fn(e.httpServer.address().port);
  });

  return e;
};

global.start_http = function(engine){
	var fs = require('fs');
	var http = require('http').createServer(function handler (req, res) {
		var uri = req.url.substr(1).split('/');

		console.log(req.url);
		console.log(uri);

	  if (uri[0] == 'engine.io'){
	  	console.log("triggered engine.io");
	  	engine.handleRequest(req, res);
	  } else {
		  console.log(__dirname + "/.." + req.url);
		  fs.readFile(__dirname + "/.." + req.url,
			  function (err, data) {
			    if (err) {
			      res.writeHead(500);
			      return res.end('Error loading data');
			    }

		    res.writeHead(200);
		    res.end(data);
		  });
		}
	}).listen(8080)

	return http
}

global.start_cloud = function(client_url){
	var Cloud = require('mocha-cloud');
	var cloud = new Cloud('mustard', 'ss2249', 'eea4a2e4-a59d-4ca4-b34e-c65702418b34');
	cloud.browser('firefox', '18', 'Windows 2008');
	cloud.url(client_url);

	cloud.on('init', function (browser) {
	  console.log('  init : %s %s', browser.browserName, browser.version);
	});

	cloud.on('start', function (browser) {
	  console.log('  start : %s %s', browser.browserName, browser.version);
	});

	cloud.on('end', function (browser, res) {
	  console.log('  end : %s %s : %d failures', browser.browserName, browser.version, res.failures);
	});

	return cloud;
}

global.start_lt = function(){
	var lt_client = require('localtunnel').client;
	var client = lt_client.connect({
	    // the localtunnel server
	    host: 'http://localtunnel.me',
	    // your local application port
	    port: 8080
	});

	client.on('error', function(err) {
	    console.log(err);
	});

	return client;
}

/**
 * Sprintf util.
 */

require('s').extend();
