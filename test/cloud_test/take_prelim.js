require("../common.js");
var fs = require('fs');
var local = true;

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
		    var prelim = require(__dirname + "/prelims/" + files[i]);
		    
		    describe(prelim.prelimDesc, function(){
		      this.timeout(90000);
		      it(prelim.prelimSpecific, function(testDone){
		      
		        var engine = listen(function (port) {

		          if (!local) {
		            var http = start_http(engine);
		            var lt = start_lt();

		            /**
		            lt.on('url', function(url) {
		              url = url + "/index.html";

		              console.log(url);
		              var cloud = start_cloud(url);

		              cloud.start(function(){
		                http.close();
		                setTimeout(testDone, 3000);
		              })
		            });
								*/

		            prelim.serverTest(engine, testDone);

		          } else {
		            prelim.clientTest('http://localhost:%d'.s(port));
								prelim.serverTest(engine, testDone);
		          }

		        })
		      })
		    })
		  }

		  done();

		});
	})
})

