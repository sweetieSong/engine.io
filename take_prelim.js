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

var run_test = function(idx, files, failures, callback){
  if (idx == files.length) {
    callback(failures);
  }
  else {
    global.file = files[idx];
    global.prelim = require(__dirname + "/test/cloud_test/prelims/" + file);
    mocha.run(function(fail){
      failures.push(fail);
      run_test(idx + 1, files, failures, callback);
    })
  }
}

var myArgs = process.argv.slice(2);
if (myArgs[0] == 'local') {
  global.url = "http://localhost";
  run_test(0, files, [], function(failures){
    process.exit(failures);
  })
} else {
  var lt = start_lt();

  lt.on('url', function (url) {
    console.log("url: " + url);
    global.url = url;
    run_test(0, files, [], function(failures){
      process.exit(failures);
    })
  });
}

