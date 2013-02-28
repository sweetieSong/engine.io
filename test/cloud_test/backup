var prelim = require("./prelims/prelim_1.js");
var localtest = false;

describe (prelim.prelimDesc, function(){
	it (prelim.prelimSpecific, function(done){
		var engine = listen(function (port) {
			prelim.clientTest('http://localhost:%d'.s(port));
			prelim.serverTest(engine, done);
		})
	})
})
