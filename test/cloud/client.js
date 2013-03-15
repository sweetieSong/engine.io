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
          var socket = new eioc.Socket(url + '/1');

          socket.on('open', function () {
            socket.on('message', function (msg) {
              expect(msg == 'apples'); 
              done();
            });
          });
      });

      it('check that server close is handled', function(done){
        var socket = new eioc.Socket(url + '/2');

        socket.on('close', function(reason){
          expect(reason).to.be('trasport close');
          done();
        })
      })
  });

});
