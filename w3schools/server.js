const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const names = [
  "Anna", "Brittany", "Cinderella", "Diana", "Eva", "Fiona", "Gunda", "Hege",
  "Inga", "Johanna", "Kitty", "Linda", "Nina", "Ophelia", "Petunia", "Amanda",
  "Raquel", "Cindy", "Doris", "Eve", "Evita", "Sunniva", "Tove", "Unni",
  "Violet", "Liza", "Elizabeth", "Ellen", "Wenche", "Vicky"
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const q = parsedUrl.query.q?.toUpperCase() || "";

  if (req.url.startsWith("/gethint")) {
    let hint = "";
    if (q.length > 0) {
      const matches = names.filter(name => name.toUpperCase().startsWith(q));
      hint = matches.join(" , ") || "no suggestion";
    } else {
      hint = "no suggestion";
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(hint);
  } else if (req.url === "/" || req.url === "/ajax_asap.html") {
    fs.readFile(path.join(__dirname, "ajax_asap.html"), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading HTML");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Servidor Node.js corriendo en http://localhost:3000/ajax_asap.html");
});
