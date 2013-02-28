require('../common.js');

var test = function () {
  var	socket = new eioc.Socket('we://localhost:8080');
  socket.onopen = function(){
    console.log('sending');
    socket.send(JSON.stringify({'cmd': 'fin', 'result': 'passed'}));
    window.mochaResults = "done";
  }
}

module.exports = {
  test: test
}
