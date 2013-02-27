require ("./common.js");

var arguments = process.argv.splice(2);
if (arguments.length != 2){
  console.log("Need to provide test id and url\nTry: node test.js [id] [test-url]");
  process.exit(1);
}

var Mocha = require('mocha')
var mocha = new Mocha

var engine = require('../index.js');

var test_id = arguments[0];
var test_url = arguments[1];

// start node server
mocha.addFile('./test/server_test/test_' + test_id + '.js');
mocha.run(function(failure){
	console.log("done BITCH");
	process.exit(failure);
});

// start http server
var http = require('http').createServer(function handler (req, res) {

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
})

http.listen(8080)
