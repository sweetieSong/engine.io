require("../common.js");
var fs = require('fs');
local = 'undefined' == typeof local ? false : local; 	// if we have defined local, then run local test

/**
 * Sprintf util.
 */

var prelimTest = function(file, url) {

  var prelim = require(__dirname + "/prelims/" + file);

  describe(prelim.prelimDesc, function () {
    this.timeout(90000);
    it(prelim.prelimSpecific, function (done) {
     
      var engine = listen(prelim.opts, function (port) {

        if (url.indexOf("localhost") < 0) {
          console.log("not local");
          var http = start_http(engine, file);

          url = url + "/index.html";
          var cloud = start_cloud(url);

          cloud.start(function () {
            http.close();
          });

          prelim.serverTest(engine, false, done);

        } else {
          prelim.clientTest(new eioc.Socket('http://localhost:' + port));
          prelim.serverTest(engine, true, done);
        }

      });

    });
  });
};

var files = fs.readdirSync(__dirname + "/prelims/");

if (files == undefined) {
  console.log('Sorry, error occurred in fetching directory files');
}
if (files.length == 0) {
  console.log('Sorry, there are no files to test in the directory');
}


if (local) {
  for (var i = 0 ; i < files.length ; i ++) {
    var file = files[i];
    prelimTest(file, "http://localhost");
  }
} else {
  var lt = start_lt();
  var sleep = require('sleep');
  sleep.sleep(2);

  lt.on('url', function() {
    console.log("ever get url?");
    for (var i = 0 ; i < files.length ; i ++) {
      var file = files[i];
      prelimTest(file, url);
    }
  });
}

