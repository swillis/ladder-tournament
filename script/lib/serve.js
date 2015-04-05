var http = require('http');
var connect = require('connect');
var opn = require('opn');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var app = connect();

var data = [
  {"author": "Jimmy Sheds", "text": "This is one comment"},
  {"author": "Tommy Pets", "text": "This is another comment"},
  {"author": "Sammy J", "text": "This is yet another comment"}
];

var server = connect()
  .use(bodyParser.urlencoded({"extended": false}))
  .use(serveStatic('.'))
  .use('/comments.json', function(req, res, next) {
    if (req.method === 'POST') {
      data.push({
        "author": req.body.author,
        "text": req.body.text
      });
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(data));
    } else if (req.method === 'GET') {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify(data));
    }
  })
  .use(function serveNotFoundIndex(req, res, next) {
    if (req.method !== 'GET' || !req.headers.accept.match('text/html')) {
      return next();
    }
    send(req, '/index.html')
      .pipe(res);
  });

var port = 8080;
http.createServer(server)
  .listen(port)
  .once('error', function (err) {
    if (err.code === 'EADDRINUSE') {
      console.log('Port in use: %s', port);
    } else {
      console.error(err);
    }
  })
  .on('listening', function () {
    console.log('\x1B[32mStarted web server on http://localhost:' + port + ' ✓\x1B[0m');
    opn('http://localhost:' + port);
  });