// Lokale, abhängigkeitfreie Vorschau für Orbitblade v5.
// Start: node tools/local-preview-server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mime = { '.css':'text/css; charset=utf-8', '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8' };
const port = Number(process.argv[2]) || 8765;

http.createServer((req, res) => {
  const clean = decodeURIComponent((req.url || '/').split('?')[0]);
  const relative = clean === '/' ? 'index.html' : clean.replace(/^\/+/, '');
  let file = path.resolve(root, relative);
  if (clean !== '/' && clean.endsWith('/')) file = path.join(file, 'index.html');
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log('Orbitblade v5: http://127.0.0.1:'+port+'/konzept/index.html'));
