
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
 * Expose `fs` global
 */
global.fs = require('fs');

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

global.start_http = function(engine, testNumber){
	var fs = require('fs');
	var http = require('http').createServer();
	http.listen(8080);

	http.on('request', function (req, res) {
		var uri = req.url.substr(1).split('/');
		
	  if (uri[0] == 'engine.io'){
	  	engine.handleRequest(req, res);
	  } else {
		  fs.readFile(__dirname + "/cloud_test" + req.url,
			  function (err, data) {
			    if (err) {
			      res.writeHead(500);
			      return res.end('Error loading data');
			    }

		    res.writeHead(200);
		    res.end(data.toString().replace("TEST_NUMBER", testNumber));
		  });
		}
	});

	return http
}

try{
		global.authentication = require('../cloud_authentication.json');
		global.username = authentication.username;
		global.userkey = authentication.userkey;
} catch(e) {

}

global.start_cloud = function(client_url,testname){
	var Cloud = require('mocha-cloud');
	var cloud = new Cloud(testname, global.username, global.userkey);
	cloud.browser('chrome', '', 'Windows 2008');
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


global.recursiveTest = function(files, local, i) {
  console.log("started test " + i);
  if (i < files.length) {
    var file = files[i];

    var prelim = require(__dirname + "/cloud_test/prelims/" + file);

    describe(prelim.prelimDesc, function () {
      this.timeout(90000);
      it(prelim.prelimSpecific, function (testDone) {
      
        var engine = listen(prelim.opts, function (port) {

          if (!local) {
            var http = start_http(engine, file);
            var lt = start_lt();

            lt.on('url', function (url) {
              url = url + "/index.html";
              var cloud = start_cloud(url);

              cloud.start(function () {
                http.close();
                setTimeout(testDone, 3000); //3000
              },file);
            });

            prelim.serverTest(engine, testDone, false, files, i, recursiveTest);

          } else {
            prelim.clientTest(new eioc.Socket('http://localhost:' + port));
            prelim.serverTest(engine, testDone, true, files, i, recursiveTest);
          }

        });
      });
    });
  }
};
