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

const testFileAccess = (path) => {
    fs.access(path, (error) => {
        if (error) {
            console.log(`$path is not accessible`);
            return false;
        }
        else {
            return true;
        }
    })
}

const createFileStream = async (path, fileEncoding = "utf-8") => {
    const fileContent = await new Promise((resolve, reject) => {
        let result = "";
        fs.createReadStream(path, { encoding: fileEncoding })
            .on("open", () => {
                console.log(`Reading from ${path}`);
            })
            .on("data", (chunk) => {
                result += chunk;
                console.log("chunk added");
            })
            .on("end", () => {
                console.log(result);
                resolve(result);

            })
            .on("error", error => reject(error));

            
    })
    .then((data) => { 
        return data;       
    })
}

let myfile = createFileStream("./index.html").then((data)=>{
    const txt = data;
    console.log(txt + " Hi");
}).then(() => console.log(myfile + " js promises suck"));


fs.readFile("./index.html", { encoding: "utf-8" }, (err, html) => { if (err) { } else { entry_file = html; console.log(); } });
//console.log(entry_file);

let entry_file = "";
const base_path = "./dist";

console.log(base_path);

function get_handler(req, res) {
    let method = req.method, url = req.url, headers = req.headers;
    console.log("request start: " + method + " " + url);

    if (method === "GET") {
        if (url === "/") {

            res.setHeader("contentType", "text/html")
            //res.statusCode = 200;
            res.write(entry_file)
            res.end("bye");
            return;
        }
        let true_path;
        if (/dist/.test(url)) {
            //true_path = path.join("", url);
            true_path = path.join(__dirname, url);
        }
        else if (/favico/.test(url)) {
            console.log("got rid of favico")
            true_path = "./dist/e665b3312091b32d.png";
            res.end()
            return;
        }
        else {
            true_path = path.join(base_path, url);
        }
        console.log("caught a GET with url: " + url);
        console.log("true path: " + true_path);


        if (testFileAccess(true_path)) {

            const contentType = getContentType(true_path);
            res.setHeader("Status Code", 200)
            res.setHeader("Content-Type", getContentType(url));
            // let filestream = fs.createReadStream(true_path, { encoding: "utf-8" }, (err, data) => {

             myfile = createFileStream(true_path).then((data) => {
                console.log("data incoming");
                res.end(data, () => {
                    console.log("wrote " + true_path + " to response");
                });
            });


            try { console.log(res.getHeader()) } catch (error) { console.log("header print error " + error) };

            // console.log("data length: " + data.length);


            //console.log("ending response");
            //res.end("server82");
        };

        //fileread.then = function(){console.log("I am the end of a promise!!!!!")};
    }


}

var server = http.createServer(function (req, res) {
    get_handler(req, res);
});

server.listen(8080);

//closing server and exiting program after specified milliseconds for testing
//setTimeout(() => { console.log("killing server"); server.close; process.exit(); }, 20000);