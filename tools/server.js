'use strict';

// Abhaengigkeitsfreie lokale Vorschau fuer die aktive Spielversion.
const fs = require('fs');
const http = require('http');
const path = require('path');

const root = path.resolve(__dirname, '..', 'konzept');
const port = Number(process.argv[2] || 8123);
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webp': 'image/webp',
};

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Ungueltiger Port:', process.argv[2]);
  process.exitCode = 1;
} else {
  const server = http.createServer((request, response) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    } catch (error) {
      response.writeHead(400).end('Bad Request');
      return;
    }

    if (pathname === '/') pathname = '/index.html';
    const target = path.resolve(root, `.${pathname.split('/').join(path.sep)}`);
    if (target !== root && !target.startsWith(root + path.sep)) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    fs.stat(target, (statError, stat) => {
      const file = !statError && stat.isDirectory() ? path.join(target, 'index.html') : target;
      fs.readFile(file, (readError, body) => {
        if (readError) {
          response.writeHead(readError.code === 'ENOENT' ? 404 : 500).end('Not Found');
          return;
        }
        response.writeHead(200, {
          'Cache-Control': 'no-store',
          'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
        });
        response.end(body);
      });
    });
  });

  server.listen(port, '127.0.0.1', () => {
    console.log(`Orbitblade: http://127.0.0.1:${port}/`);
  });
}
