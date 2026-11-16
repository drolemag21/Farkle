// Tiny static server for testing locally. Wraps skeleton-less .html files in the same doctype/head
// skeleton the Artifact publisher adds, and serves .js as JavaScript so ES modules load.
// Usage: node tests/serve.js [root=.] [port=8765], then open http://localhost:8765/index.html
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.resolve(process.argv[2] || "."), port = +process.argv[3] || 8765;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png" };
http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split("?")[0]));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end("not found"); }
  let body = fs.readFileSync(p);
  if (p.endsWith(".html") && !/^\s*<!doctype/i.test(body.toString())) {
    body = '<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>' + body + "</body></html>";
  }
  res.writeHead(200, { "content-type": TYPES[path.extname(p)] || "application/octet-stream", "cache-control": "no-store" });
  res.end(body);
}).listen(port, () => console.log("serving " + root + " on " + port));
