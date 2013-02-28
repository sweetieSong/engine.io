var eoic, expect;

// expect.js does not have a component. try/catch here to fix for browser test
try {
	expect = require("expect.js");
} catch (err) {}

// include engine.io-client (because component packages it differently, need try/catch)
try {
	eioc = require('engine.io-client');
} catch (err){
	eioc = require('LearnBoost-engine.io-client');
}

// when we run in browser, module is 'undefined'
if ('undefined' == typeof module) {
  var module = { exports: {} }
    , exports = module.exports
}

var _clientTest = function(socket){
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