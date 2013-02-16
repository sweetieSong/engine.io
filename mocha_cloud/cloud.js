var arguments = process.argv.splice(2);
if (arguments.length == 0){
  console.log("Need to provide url\nTry: node server.js [client url]");
  process.exit(1);
}

var client_url = arguments[0];

var Cloud = require('mocha-cloud');
/*
  , Canvas = require('term-canvas')
  , size = process.stdout.getWindowSize()
  , GridView = require('mocha-cloud-grid-view');
  */

var cloud = new Cloud('mustard', 'ss2249', 'eea4a2e4-a59d-4ca4-b34e-c65702418b34');
cloud.browser('firefox', '18', 'Windows 2008');
cloud.url(client_url);

/* setup
var canvas = new Canvas(size[0], size[1]);
var ctx = canvas.getContext('2d');
var grid = new GridView(cloud, ctx);
grid.size(canvas.width, canvas.height);
ctx.hideCursor();


// trap SIGINT
process.on('SIGNIT', function () {
  ctx.reset();
  process.nextTick(function () {
    process.exti();
  });
});
*/

cloud.on('init', function (browser) {
  console.log('  init : %s %s', browser.browserName, browser.version);
});

cloud.on('start', function (browser) {
  console.log('  start : %s %s', browser.browserName, browser.version);
});

cloud.on('end', function (browser, res) {
  console.log('  end : %s %s : %d failures', browser.browserName, browser.version, res.failures);
});

// output complete messages
// once complete, and exit > 0 accordingly
cloud.start(function () {
/*  grid.showFailures();
  setTimeout(function () {
    ctx.showCursor();
    process.exit(grid.totalFailures());
  }, 100);
*/
});
