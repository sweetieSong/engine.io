var exports.start_http = require('http').createServer(function handler (req, res) {
  var fs = require('fs');
  console.log(__dirname + "/client_test" + req.url);
  fs.readFile(__dirname + "/client_test" + req.url,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading data');
    }

    res.writeHead(200);
    res.end(data);
  });
}).listen(8080)