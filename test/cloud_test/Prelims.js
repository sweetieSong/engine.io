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
          var http = start_http(engine, file);

          var cloud = start_cloud(url + "/index.html");

          cloud.start(function () {
            http.close();
            done();
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

