"use strict";
//export const __esModule = true;
//import { createServer } from "node:http";
//import * as fs from "node:fs";
//import path from "node:path";

const http = require("http");
const fs = require("fs");
const path = require("path")



//import main from "index.html";


const mimeTypes = {
    '.html': 'text/html',
    '.jgp': 'image/jpeg',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.tsx': 'text/javascript',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
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

const testFileAccess = (filepath) => {

    // const dir_regex = new RegExp(`${__dirname}`);
    // console.log("my regex: " + dir_regex + " test: " + dir_regex.test(filepath) + " for " +  filepath);
    const is_absolute_path = filepath.includes(__dirname) && filepath.includes("dist");

    console.log(`TEST ACCESS: Test path is absolute : ${filepath.includes(__dirname)}`);

    const absolute_path = path.join((path.join(__dirname, "\\dist")), filepath);
    console.log(`TEST ACCESS: constructed true path: ${absolute_path}`);
    //console.log(`ACCESS TEST; normalized_path: ${absolute_path}`);
    let accessible;
    if (is_absolute_path) {
        try {
            fs.accessSync(filepath);
            accessible = true;
        }
        catch (err) {
            accessible = false;
            console.log(err);
        }
    }
    else {
        try {
            fs.accessSync(absolute_path)
            accessible = true;
        }
        catch (err) {
            accessible = false;
            console.log(err);
        }
    }
    return accessible;
}
// console.log(testFileAccess("C:\\base\\work\\webdev-projects\\martin_sparstad_homepage\\dist\\main.js") + " banana");

const createFileStream = (path, fileEncoding = null) => {
    return (new Promise((resolve, reject) => {
        let result = "";
        fs.createReadStream(path, { encoding: fileEncoding })
            .on("open", () => {
                console.log(`FILE STREAM: Function; Reading from ${path} with encoding ${fileEncoding}`);
            })
            .on("data", (chunk) => {
                result += chunk;
                //console.log("chunk added");
            })
            .on("end", () => {
                console.log(`FILE STREAM: promise resolved for ${path}`);
                resolve(result);

            })
            .on("error", error => {
                console.log("FILE STREAM: " + error);
                reject(error)
            });
    }))
}
const promistStart = performance.now();
const mypromise = createFileStream("./index.html");
mypromise.then((data) => { return console.log("This promise has finished " + (performance.now() - promistStart)) });

fs.readFile("./index.html", { encoding: "utf-8" }, (err, html) => { if (err) { } else { entry_file = html; console.log(); } });
//console.log(entry_file);

let entry_file = "";
const base_path = "./dist";


console.log(`BASE PATH: ${base_path} __dirname: ${__dirname}`);


function get_handler(req, res) {
    let method = req.method, url = req.url, headers = req.headers;
    console.log("Main Loop;  request start: " + method + " " + url);

    let true_path;
    if (/dist/.test(url)) {
        true_path = path.join(__dirname, url);
    }
    else {
        true_path = path.join((path.join(__dirname, "\\dist")), url);
    }
    const contentType = getContentType(true_path);
    const path_accesible = testFileAccess(true_path);



    console.log(`Main Loop;  true path: ${true_path}, accessible: ${path_accesible}`);


    if (method == "GET") {

        if (url == "/") {
            res.setHeader("contentType", "text/html")
            //res.statusCode = 200;
            res.write(entry_file)
            res.end();
        }
        // else if (/dist/.test(url)) {
        //     //true_path = path.join("", url);
        //     //true_path = path.join(__dirname, url);
        // }
        // else if (/favico/.test(url)) {
        //     console.log("Main Loop; got rid of favico")
        //     true_path = "./dist/e665b3312091b32d.png";
        //     res.end()
        // }
        else if (path_accesible) {
            console.log("Main Loop; caught a GET with url: " + url);
            console.log("Main Loop; true path: " + true_path);

            console.log(`Main Loop; path accessible return: ${path_accesible}`);



            console.log(`Main Loop; Content type return : ${contentType}`);

            res.setHeader("StatusCode", 200)
            res.setHeader("Content-Type", contentType);
            
            if(true_path.includes("png")){
                res.setHeader("Content-Encoding", "gzip");
            }


            let readFilePromise = createFileStream(true_path);
            readFilePromise.then((data) => {
                console.log(`Main Loop; sending file: ${true_path}`);
                res.end(data);
            })

            try {
                console.log(res.getHeaders())
            }
            catch (error) {
                console.log("header print error " + error)
            };
            //console.log("ending response");
            //res.end("server82");
        }
        else {
            res.setHeader("StatusCode", 500)
            res.end();
            console.log(`can't access ${true_path}`)
        };
        //fileread.then = function(){console.log("I am the end of a promise!!!!!")};
    }
    else {
        console.log("caught a non GET request");
    }
}

// var server = http.createServer(function (req, res) {
//     get_handler(req, res);
// });

var server = http.createServer();
server.on("request", (req, res) => {
    console.log("Request recieved!");
    get_handler(req, res);
})
server.listen(8080);

//closing server and exiting program after specified milliseconds for testing
//setTimeout(() => { console.log("killing server"); server.close; process.exit(); }, 20000);