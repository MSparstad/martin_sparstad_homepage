"use strict";
//export const __esModule = true;
//import { createServer } from "node:http";
//import * as fs from "node:fs";
//import path from "node:path";

const http = require("http");
const fs =require("fs");
const path = require("path")
const src = require("src");



//import main from "index.html";
let entry_file = "";
const base_path = __dirname;

console.log(src);

const mimeTypes = {
    '.html': 'text/html',
    '.jgp': 'image/jpeg',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.tsx': 'text/javascript',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
};

const getContentType = (url) => {
    let contentType = "application/octet-stream";
    const extname = path.extname(url);
    for (let key in mimeTypes) {
        if (mimeTypes.hasOwnProperty(key)) {
            if (extname === key) {
                contentType = mimeTypes[key];
            }
        }
    }
    return contentType;
}

//console.log(entry_file);
var server = http.createServer(function (req, res) {

    fs.readFile("./index.html", { encoding: "utf-8" }, (err, html) => { if (err) { throw err } else { entry_file = html; console.log(); } });
    //console.log(entry_file);
    console.log("attempting start");
    var method = req.method, url = req.url, headers = req.headers;
    // if (method === "GET"){
    //     console.log("caught a GET with url: " + url);
    // }

    //entry_file.then(console.log(entry_file), console.log("promise failed"))
    //console.log(method + " " + url);
    if (method === "GET" && url === "/") {
        console.log("caught a GET with url: " + url);
        res.writeHead(200, { 'Content-Type': 'text/html' })
        //res.statusCode = 200;
        res.write(entry_file)
        res.end("bye");
    }
    else if (method === "GET") {
        let true_path = path.join(base_path, url); 
        console.log(true_path);
        fs.access(true_path, (err) => {
            console.log(err ? true_path + " doesn't exist " + err : true_path + " exists");
            if (!err) {
                fs.readFile(true_path, { encoding: "utf-8" }, (err, data) => {
                    if (err) {
                        //throw err
                    }
                    else {
                        const contentType = getContentType(true_path);
                        res.setHeader("Content-Type", contentType);

                        res.write(data);
                        console.log("wrote " + true_path + " to response");
                    }
                });
            }
            res.end;
        })

    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('uncaught get');
    }

    //console.log("server started " + this.url);
});

server.listen(8080);

//closing server and exiting program after specified milliseconds for testing
//setTimeout(() => { console.log("killing server"); server.close; process.exit(); }, 20000);