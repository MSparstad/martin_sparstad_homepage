"use strict";
export const __esModule = true;
import { createServer } from "node:http";
import * as fs from "node:fs";

//import main from "index.html";
let entry_file = "";

//console.log(entry_file);
var server = createServer(function (req, res) {

    fs.readFile("./index.html", { encoding: "utf-8" }, (err, html) => { if (err) { throw err } else { entry_file = html; console.log(); } });
    //console.log(entry_file);
    console.log("attempting start");
    var method = req.method, url = req.url, headers = req.headers;
    // if (method === "GET"){
    //     console.log("caught a GET with url: " + url);
    // }

    //entry_file.then(console.log(entry_file), console.log("promise failed"))
    console.log(method + " " + url);
    if (method === "GET" && url === "/") {
        console.log("caught a GET with url: " + url);
        res.writeHead(200, { 'Content-Type': 'text/html' })
        //res.statusCode = 200;
        res.write(entry_file)
        res.end("bye");
    }
    else if (method === "GET") {

    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('uncaught get');
    }

    //console.log("server started " + this.url);
});

server.listen(8080);

//closing server and exiting program after 15 seconds for testing
setTimeout(() => { console.log("killing server"); server.close; process.exit(); }, 20000);