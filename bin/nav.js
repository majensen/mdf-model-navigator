#!/usr/bin/env node

import finalhandler from 'finalhandler';
import http from 'http';
import serveStatic from 'serve-static';

var serve = serveStatic('build', { index: ['index.html', 'index.htm'] });

// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res));
});

// Listen
server.listen(3000);
console.log("MDF Model Navigator listening on port 3000");

