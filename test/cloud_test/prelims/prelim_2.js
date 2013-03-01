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
    , exports = module.exports;
}

var _clientTest = function (socket) {
  socket.on('open', function () {
    socket.send('a');
    socket.send('b');
    socket.send('c');
  });
};

var _serverTest = function (engine, done, local, files, i, callback) {
  var a = 0;
  var b = 0;
  var c = 0;
  var all = 0;
	engine.on('connection', function (conn) {
    conn.on('message', function (msg) {
      if (msg == 'a') a ++;
      if (msg == 'b') b ++;
      if (msg == 'c') c ++;

      if (++all == 3) {
        expect(a).to.be(1);
        expect(b).to.be(1);
        expect(c).to.be(1);
        if (local) {
          done();
        }
        callback(files, local, i + 1);
      }
    });
  });
};

module.exports = {
  clientTest: _clientTest,
  serverTest: _serverTest,

	prelimDesc: "callback",
	prelimSpecific: "should execute once for each send ",

  opts : {}
};
