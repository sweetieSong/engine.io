require('../common.js');

var servers = [];
var idx = 0;
var engine;

var http = require('http').createServer();
http.listen(8080);

/**
 * Possible Requests:
 *
 * HTTP
 * Test: url will of form 'http://.../test/[TESTNUM]/engine.io/...'
 */
http.on('request', function (req, res) {
  var uri = req.url.substr(1).split("/");
  if (uri[0] == 'test'){
    // find the correct engineio server to handle
    servers[uri[1]].handleRequest(request, response)
  } else {
    // serve index.html file
    // ...
  }
});

/**
 * Servers
 */
engine = listen(function (port) {
  engine.on('connection', function (conn) {
    conn.on('message', function () {
      conn.send('apples');
    });
  });
});
servers[idx++] = engine;

engine = listen(function (port) {
  engine.on('connection', function (conn) {
    conn.close();
  });
});
servers[idx++] = engine;

