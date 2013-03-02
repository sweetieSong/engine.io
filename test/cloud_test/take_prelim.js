require("../common.js");

// Grabbing all the test files under the prelims directory
var files = fs.readdirSync(__dirname + "/prelims/");

if (files == undefined) {
  console.log('Sorry, error occurred in fetching directory files');
}
if (files.length == 0) {
  console.log('Sorry, there are no files to test in the directory');
}

var Mocha = require('mocha');
var mocha = new Mocha;

// Prelims.js file contains the mocha test
mocha.addFile('./test/cloud_test/Prelims.js');

/**
 * Run the mocha tests recursively
 */
var run_test = function(idx, files, failures, callback){
  if (idx == files.length) {
    callback(failures);
  }
  else {
    global.file = files[idx];
    global.prelim = require(__dirname + "/prelims/" + file);
    mocha.run(function(fail){
      failures.push(fail);
      run_test(idx + 1, files, failures, callback);
    })
  }
}

// If there is a local argument, then the test is run locally
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

