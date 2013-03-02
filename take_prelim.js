require("./test/common.js");
var fs = require('fs');

var files = fs.readdirSync(__dirname + "/test/cloud_test/prelims/");

if (files == undefined) {
  console.log('Sorry, error occurred in fetching directory files');
}
if (files.length == 0) {
  console.log('Sorry, there are no files to test in the directory');
}

var Mocha = require('mocha');

var mocha = new Mocha;

mocha.addFile('./test/cloud_test/Prelims.js');

var myArgs = process.argv.slice(2);
if (myArgs[0] == 'local') {
  for (var i = 0 ; i < files.length ; i ++) {
    global.file = files[i];
    global.url = "http://localhost";
    global.prelim = require(__dirname + "/test/cloud_test/prelims/" + file);
    mocha.run();
  }
} else {
  var lt = start_lt();

  lt.on('url', function (url) {
    console.log("ever get url?");
    for (var i = 0 ; i < files.length ; i ++) {
      global.file = files[i];
      global.url = url;
      global.prelim = require(__dirname + "/test/cloud_test/prelims/" + file);
      mocha.run();
    }
  });
}

