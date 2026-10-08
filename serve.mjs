/* Minimalny serwer statyczny do podglądu/testów launchera.
   Użycie:  node serve.mjs [port]     (domyślnie 8173)
   Nic nie zapisuje — to tylko wygodne podanie plików przeglądarce. */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = Number(process.argv[2]) || 8173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    let rel = decodeURIComponent(url.pathname);
    if (rel.endsWith('/')) rel += 'index.html';

    const path = join(ROOT, normalize(rel).replace(/^([/\\])+/, ''));
    if (!path.startsWith(ROOT)) {
      res.writeHead(403).end('403');
      return;
    }

    const info = await stat(path);
    if (info.isDirectory()) {
      res.writeHead(301, { Location: rel + '/' }).end();
      return;
    }

    const body = await readFile(path);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(path).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('404');
  }
}).listen(PORT, () => {
  console.log(`English Launcher: http://localhost:${PORT}/`);
});