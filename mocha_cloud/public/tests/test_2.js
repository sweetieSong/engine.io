//Test 2: basic socketIO interaction (to prove that Mocha works)

socket = new eio.Socket({ host: document.location.hostname, port: 8000 });

describe('engine.io', function(){
  describe('#onmessage()', function(){
  	it('should receive a message from the server', function(){
  		socket.onopen = function(){
  			socket.onmessage = function(message){
  				assert(message == "HELO");

  				var json = {test:"2", status:"ok"};
  				window.testResults.push(json);
  			}
  		}
  	});
  });
});