var lt_client = require('localtunnel').client;

var client = lt_client.connect({
      // the localtunnel server
           host: 'http://localtunnel.me',
      //         // your local application port
                   port: 12345
                   });
      //
      //             // when your are assigned a url
                   client.on('url', function(url) {
                     console.log(url);
      //                 // you can now make http requests to the url
      //                     // they will be proxied to your local server on port [12345]
                           });
      //
                           client.on('error', function(err) {
      //                         // uh oh!
                               });
