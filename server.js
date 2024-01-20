"use strict";
//export const __esModule = true;
//import { createServer } from "node:http";
//import * as fs from "node:fs";
//import path from "node:path";

const http = require("http");
const fs = require("fs");
const path = require("path")



//import main from "index.html";
let entry_file = "";
const base_path = __dirname;

console.log(base_path);

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
fs.readFile("./index.html", { encoding: "utf-8" }, (err, html) => { if (err) { } else { entry_file = html; console.log(); } });
//console.log(entry_file);
console.log("attempting start");
var server = http.createServer(function (req, res) {
    let method = req.method, url = req.url, headers = req.headers;
    console.log("request start: " + method + " " + url + " " + Math.random());



    // if (method === "GET"){
    //     console.log("caught a GET with url: " + url);
    // }

    //entry_file.then(console.log(entry_file), console.log("promise failed"))
    //console.log(method + " " + url);
    // if (method === "GET" && url === "/") {
    //     console.log("caught a GET with url: " + url);
    //     res.writeHead(200, { 'Content-Type': 'text/html' })
    //     //res.statusCode = 200;
    //     res.write(entry_file)
    //     res.end("bye");
    // }
    if (method === "GET") {
        let true_path = path.join(base_path, url);
        if (url === "/") {
            console.log("caught a GET with url: " + url);
            res.writeHead(200, { 'Content-Type': 'text/html' })
            //res.statusCode = 200;
            res.write(entry_file)
            res.end("bye");
            return;

        }
        console.log("true path: " + true_path);
        fs.access(true_path, (err01) => {
            console.log(err01 ? true_path + " doesn't exist " + err01 : true_path + " exists");
            if (!err01) {
                console.log("err01" + err01);
                let fileread = fs.readFile(true_path, { encoding: "utf-8" }, (err, data) => {
                    console.log("err " + err);
                    if (err) {
                    }
                    else {
                        const contentType = getContentType(true_path);

                        // res.setHeader("Content-Type", contentType);
                        // res.setHeader("Status Code", 200);
                        res.writeHead(200, { 'Content-Type': contentType })
                        try { console.log(res.getHeader()) } catch (error) { console.log("header print error") };

                        console.log("data length: " + data.length);
                        res.write(data,()=>{console.log("wrote " + true_path + " to response"); res.end()});
                        
                        //console.log("ending response");
                        //res.end("server82");
                    }
                });
                
            }
            //console.log("fileread: " + fileread);
        });
        //fileread.then = function(){console.log("I am the end of a promise!!!!!")};
        
        console.log("server88");
    }

    console.log("end of request");
});

server.listen(8080);

//closing server and exiting program after specified milliseconds for testing
//setTimeout(() => { console.log("killing server"); server.close; process.exit(); }, 20000);