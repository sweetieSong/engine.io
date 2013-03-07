/*global eio,eioc,listen,request,expect*/

/**
 * Tests dependencies.
 */

var http = require('http')
  WebSocket = require('ws');

/**
 * Tests.
 */

describe('server', function () {

  describe('verification', function () {

      it('check that receive message', function (done) {
          var socket = new eioc.Socket('http://stkc.localtunnel.me');

          socket.on('open', function () {
            socket.on('message', function (msg) {
              expect(msg == 'apples'); 
              done();
            });
          });
      });

  });

});
