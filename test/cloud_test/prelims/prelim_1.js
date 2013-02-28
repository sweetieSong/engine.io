var eoic, expect;

// expect.js does not have a component. try/catch here to fix for browser test
try {
	expect = require("expect.js");
} catch (err) {}

// include engine.io-client (because component packages it differently, need try/catch)
try {
	eioc = require('engine.io-client');
} catch (err){
	eioc = require('engine.io');
}

var _clientTest = function(url){
		var socket = new eioc.Socket(url);
	  socket.on('open', function () {
	    socket.close();
	  });
}

var _serverTest = function (engine, done) {
	engine.on('connection', function (conn) {
    conn.on('close', function (reason) {
      expect(reason).to.be('transport close');
      done();
    });
  });
}

module.exports = {
  clientTest: _clientTest,
  serverTest: _serverTest,

	prelimDesc: "close",
	prelimSpecific: "should trigger when client closes "
};
