require('../common.js');

var engine = listen(function (port) {
  var http = require('http').createServer();
  http.listen(8080);

  http.on('request', function (req, res) {
      engine.on('connection', function (conn) {
        console.log('connected');
        conn.on('message', function () {
          conn.send('apples');
        });
    });
  });
});
