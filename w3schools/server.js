const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const mimeTypes = {
  '.html': 'text/html',
  '.xml': 'text/xml',
};

const server = http.createServer((req, res) => {
  let parsed = url.parse(req.url);
  let filePath = '.' + (parsed.pathname === '/' ? '/ajax_catalog.html' : parsed.pathname);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Archivo no encontrado");
    } else {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log("Servidor en http://localhost:3000/ajax_catalog.html");
});
