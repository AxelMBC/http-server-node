import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";

const { PORT } = process.env;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);

// Simple Example of server routing
const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        filePath = path.join(__dirname, "public", "index.html");
        const data = await fs.readFile(filePath);
        res.write(data);
        // res.write("<h1>Welcome to the homepage</h1>");
        res.end();
      } else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        filePath = path.join(__dirname, "public", "about.html");
        const data = await fs.readFile(filePath);
        res.write(data);
        // res.write("<h1>Welcome to the about page</h1>");
        res.end();
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>Page not found</h1>");
        res.end();
      }
      console.log("req url: ", req.url);
      console.log("req method: ", req.method);
    } else {
      throw new Error("Method not allowed");
    }
  } catch (err) {
    if (err.message === "Method not allowed") {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method Not Allowed");
    } else {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    }
  }
});

// listen on a port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
