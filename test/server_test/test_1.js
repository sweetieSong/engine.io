describe('engine.io', function(){
	this.timeout(90000);

	it('should pass test 1', function(done){
	
		var engine = listen(function (port) {

			var http = start_http(engine);
			var lt = start_lt();

			lt.on('url', function(url) {
				url = url + "/test_1.html";

				console.log(url);
				var cloud = start_cloud(url);

		  	cloud.start(function(){
		  		http.close();

		  		setTimeout(done, 3000);

		  	})
		  });

    	engine.on('connection', function(socket){
      	socket.on('message', function(msg){
      		var json = JSON.parse(msg);
      		switch (json['cmd']){
      			case "fin":
      				expect(json['result']).to.equal('passed');
      				break;
      			default:
      				socket.send(msg);
      		}
      	})
      })
    })
	})

})