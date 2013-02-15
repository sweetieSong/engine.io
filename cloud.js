var arguments = process.argv.splice(2);
if (arguments.length == 0){
  console.log("Need to provide url\nTry: node test.js [client url]");
  process.exit(1);
}

var client_url = arguments[0];

var Cloud = require('mocha-cloud')
  , c = require('./c.js')
  , Mocha =  require('mocha');

var cloud = new Cloud('mustard', 'ss2249', 'eea4a2e4-a59d-4ca4-b34e-c65702418b34');
cloud.browser('firefox', '18', 'Windows 2008');
cloud.browser('chrome', '', 'Mac 10.8');
cloud.url(client_url);

var mocha = new Mocha;
mocha.addFile('mocha_tests.js');

cloud.on('init', function (browser) {
  console.log('  init : %s %s', browser.browserName, browser.version);
});

cloud.on('start', function (browser) {
  console.log('  start : %s %s', browser.browserName, browser.version);
  c(mocha.run().globals(['mochaResults']));
});

cloud.on('end', function (browser, res) {
  console.log('  end : %s %s : %d failures', browser.browserName, browser.version, res.failures);
});

cloud.start();
