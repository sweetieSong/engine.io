require('../common.js');

var Canvas = require('term-canvas')
  , size = process.stdout.getWindowSize()
  , GridView = require('mocha-cloud-grid-view')
	, Cloud = require('mocha-cloud')
  , lt_client = require('localtunnel').client;


var cloud = new Cloud("canvas?", global.username, global.userkey);
cloud.browser('chrome', '', 'Windows 2008');
cloud.browser('firefox', '17', 'Mac 10.6');

//cloud.browser('iphone', '5.0', 'Mac 10.6');
//cloud.browser('iphone', '5.1', 'Mac 10.8');
//cloud.browser('iphone', '6', 'Mac 10.8');
//cloud.browser('ipad', '5.1', 'Mac 10.8');
//cloud.browser('ipad', '6', 'Mac 10.8');
//cloud.browser('safari', '5', 'Mac 10.6');
//cloud.browser('chrome', '', 'Mac 10.8');
//cloud.browser('firefox', '15', 'Windows 2003');
//cloud.browser('firefox', '16', 'Windows 2003');
//cloud.browser('firefox', '17', 'Windows 2003');

cloud.on('init', function (browser) {
//  console.log('  init : %s %s', browser.browserName, browser.version);
});

cloud.on('start', function (browser) {
//  console.log('  start : %s %s', browser.browserName, browser.version);
});

cloud.on('end', function (browser, res) {
//  console.log('finished');
//res.failures.forEach(function(failure){
//    console.log(failure.fullTitle + "\n");
  //});

});

var client = lt_client.connect({
  host: 'http://localtunnel.me', 
  port: 8080
});

client.on('url', function(url) {
  //console.log(url + '/index.html');
  cloud.url(url + '/index.html');
});

// setup

var canvas = new Canvas(size[0], size[1]);
var ctx = canvas.getContext('2d');
var grid = new GridView(cloud, ctx);
grid.size(canvas.width, canvas.height);
ctx.hideCursor();

// trap SIGINT

process.on('SIGINT', function(){
  ctx.reset();
  process.nextTick(function(){
    process.exit();
  });
});

// output failure messages
// once complete, and exit > 0
// accordingly

cloud.start(function(){
  grid.showFailures();
  setTimeout(function(){
    ctx.showCursor();
    process.exit(grid.totalFailures());
  }, 3000);
});
