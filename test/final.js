var fs = require('fs');

fs.readdir(__dirname + "/server_test/", function(err, files) {
  if (err) {
    console.log('Sorry, error occurred in fetching directory files');
  }
  if (files.length == 0) {
    console.log('Sorry, there are no files to test in the directory');
  }

  for (var i = 0 ; i < files.length ; i++) {
    var prelim = require(__dirname + "/server_test/" + files[i]);

    describe('' + files[i], function(){
      this.timeout(90000);

      it('should pass' + files[i], function(done){
      
        var engine = listen(function (port) {

          if (!local) {
            var http = start_http(engine);
            var lt = start_lt();

            fs.readFile(__dirname + "/client_test/basic.html", function(err, data) {
              if (err){
                console.log('error in generating html');
                continue;
              }
              data.replace('insert', prelim.clientTest.toString());

              lt.on('url', function(url) {
                url = url + "/test_1.html";

                console.log(url);
                var cloud = start_cloud(url);

                cloud.start(function(){
                  http.close();

                  setTimeout(done, 3000);

                })
              });
              prelim.serverTest(engine);
            });

          } else {
            var socket = new eioc.Socket('http://localhost:%d'.s(port));
            prelim.serverTest(engine);
            prelim.clientTest(socket);
          }
          done();
        })
      })

    })
  }
});

