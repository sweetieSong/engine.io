describe('engine.io', function(){
	this.timeout(90000);

	var http = start_http();
	var lt = start_lt();
	it('should pass test 1', function(done){
	
	// when your are assigned a url
		lt.on('url', function(url) {

			console.log(url);
			
			/**
			var cloud = start_cloud(url);

	  	cloud.start(function(){
	  		console.log("done");
	  		done();
	  	})

	    var engine = listen(function (port) {
	    	
	    	engine.on('connection', function(socket){
	      	socket.on('message', function(msg){

	      		switch (msg.cmd){
	      			case "fin":
	      				expect(msg.result).to.equal('passed');
	      				break;
	      			default:
	      				socket.send(msg);
	      		}

	      	});
	      });
	    });
			*/
			
	  });
	});


	http.close();

});