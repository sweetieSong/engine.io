
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

/** 
 * Prints the async errors to the error.txt
 */
global.print_errors = function(browsers, fullTitle, stack) {
  
  var log = fs.createWriteStream('errors.txt', {flags: 'a', encoding: null});
  log.once('open', function (fd) {
    log.write("\n");
    var string = browsers
    log.write(browsers);
    log.write("\n");
    log.write(fullTitle);
    log.write("\n");
    var replaced = stack.replace(/^/gm, '       ');
    log.write(replaced);
    log.write("\n");
    log.end();
  });
};

/**
 * Starts an http server and serves the files 
 * and handle img requests
 */
global.start_http = function(grid, engines, cloud){
  var useragent = require('useragent')
    , http = require('http').createServer();
  http.listen(8080);

  fs.writeFile('errors.txt', "");
  // http requests
  http.on('request', function (req, res) {
    //console.log(req.url);
    // If the request is for sockets
    if (req.url.indexOf('engine.io') > -1) {
      var splits = req.url.split('/');
      var index;
      if (req.url.indexOf('localhost') > -1) {
        index = parseInt(splits[4], 10);
      } else {
        index = parseInt(splits[2], 10);
      }

      // Give it to the appropriate socket
      engines[index].handleRequest(req, res);

    } else if (req.url.indexOf('fullTitle') > -1) {

    // If the request is a test response
      var stripped = decodeURIComponent(req.url);
      var indexFullTitle = stripped.indexOf('fullTitle') + 10
        , indexStack = stripped.indexOf('stack') + 6;

      var fullTitle = stripped.substring(indexFullTitle, indexStack - 7)
        , stack = stripped.substring(indexStack, stripped.length - 1);

      var agent = useragent.parse(req.headers['user-agent']);
      print_errors(agent.toString(), fullTitle, stack);
      var family = agent.toAgent().split(' ');
      var name = family[0];
      var version = family[1].split('.')[0];

      //console.log("==== DEBUG ====");
      //console.log(name);
      //console.log(family);
      //console.log(version);

      if (grid != null) {
        grid.markErrored(name, version, agent.os.toString(), cloud);
      }

    } else {
      fs.readFile(__dirname + '/../test' + req.url,
        function (err, data) {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading data');
          }
        
          res.writeHead(200);
          res.end(data.toString());
        });
    }
  });

  return http
}

try{
    global.authentication = require('cloud_authentication.json');
    global.username = authentication.username;
    global.userkey = authentication.userkey;
} catch(e) {

}

/** 
 * Starts the localtunnel instance
 */
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
