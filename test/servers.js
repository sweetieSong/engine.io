require('common.js');

module.exports = function () {
  var engines = []
    , ports = []
    , idx = 0;

  /**
   * Servers
   */
  var engine = new eio.Server();
  engine.on('connection', function (conn) {
    conn.send('apples');
  });
  engines[idx++] = engine;

  engine = new eio.Server();
  engine.on('connection', function (conn) {
    conn.close();
  });
  engines[idx++] = engine;
  return engines;
};
