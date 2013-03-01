require("../common.js");
var fs = require('fs');
local = 'undefined' == typeof local ? false : local; 	// if we have defined local, then run local test

describe ("mocha-cloud tests", function(){
	this.timeout(100000);

	it ("should work", function(done){
		fs.readdir(__dirname + "/prelims/", function(err, files) {

		  if (err) {
		    console.log('Sorry, error occurred in fetching directory files');
		  }
		  if (files.length == 0) {
		    console.log('Sorry, there are no files to test in the directory');
		  }

		  for (var i = 0 ; i < files.length ; i++) {
		  	var file = files[i];

		    var prelim = require(__dirname + "/prelims/" + file);

		    describe(prelim.prelimDesc, function(){
		      this.timeout(90000);
		      it(prelim.prelimSpecific, function(testDone){
		      
		        var engine = listen(prelim.opts, function (port) {

		          if (!local) {
		            var http = start_http(engine, file);
		            var lt = start_lt();

		            lt.on('url', function(url) {
		              url = url + "/index.html";
		              var cloud = start_cloud(url);

		              cloud.start(function(){
		                http.close();
		                setTimeout(testDone, 3000);
		              })
		            });

		            prelim.serverTest(engine, testDone, false);

		          } else {
		            prelim.clientTest(new eioc.Socket('http://localhost:%d'.s(port)));
								prelim.serverTest(engine, testDone, true);
		          }

		        })
		      })
		    })
		  }

		  done();

		});
	})
})

