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

      if (files.length > 0) {
        recursiveTest(files, local, 0);
      }
		  done();

		});
	})
})

