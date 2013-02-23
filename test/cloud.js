require ("./common.js");

var arguments = process.argv.splice(2);
if (arguments.length != 2){
  console.log("Need to provide url\nTry: node test.js [id] [test-url]");
  process.exit(1);
}

var Mocha = require('mocha')
var mocha = new Mocha

var engine = require('../index.js');

var test_id = arguments[0];
var test_url = arguments[1];

// start node server
mocha.addFile('./test/server_test/test_1.js');
mocha.run(function(){
	console.log("done");
})

// start http server

