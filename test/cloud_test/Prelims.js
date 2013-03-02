require("../../take_prelim.js");
var fs = require('fs');

/**
 * Sprintf util.
 */

describe("test", function () {


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
});

