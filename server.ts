

import * as http from 'node:http';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');

    const {method, url, headers} = req;


    if (method === "GET" && url === "/") {
        res.setHeader("Content-Type", "text/html")
        res.statusCode = 200
        res.end("<html><body><h1>Hello, World!</h1></body></html>")
      }
      console.log("server started " + server);
});

