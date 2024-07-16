#!/usr/bin/env node

import finalhandler from 'finalhandler';
import http from 'http';
import serveStatic from 'serve-static';
import process from 'node:process';
import path from 'node:path';

// find root in npx cache
const root = path.join(
  path.parse( path.parse(process.env._).dir ).dir,
  path.parse(process.env._).name,
  'build'
);
var serve = serveStatic(root, { index: ['index.html', 'index.htm'] });

// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res));
});

// Listen
server.listen(3000);
console.log("MDF Model Navigator listening on port 3000");

