"use strict";
//export const __esModule = true;
//import { createServer } from "node:http";
//import * as fs from "node:fs";
//import path from "node:path";

const http = require("http");
const fs = require("fs");
const path = require("path")


const routes = ["/", "/music", "/gallery", "/diverse", "/comingsoon"];
const base_path = "dist";
const mimeTypes = {
    '.html': 'text/html',
    '.jgp': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.tsx': 'text/javascript',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
};


//Removing site map as it is regenerated every time we build to check for new files


//Checking what files we have & generating JSON map
const all_files = file_crawl("./dist", []);


let entry_file = "";

//Recurse through all files in give folderstructure
//params: path to start folder, paths to recurse on(pass empty array)
function file_crawl(path, paths) {
    // console.log(`crawling files `);
    let current_paths = [];
    let current_files = [];
    let files = fs.readdirSync(path)

    current_paths = files;
    // console.log(`current_paths ${current_paths}`);

    current_paths.forEach((item) => {
        // console.log(`item: ${item}`)
        let full_path = (path + "/" + item);
        let item_stats = fs.lstatSync(full_path);


        // console.log(`item stats: ${item_stats}`);
        if (item_stats.isFile()) {
            current_files.push(full_path);
            // console.log(`${item} is file: ${item_stats.isFile()}`);
            // console.log(full_path);
        }
        else if (item_stats.isDirectory()) {
            //     // console.log(`${item} is dir: ${item_stats.isDirectory()}`);
            //     console.log(`recursing to  ${full_path}, current results: ${paths}`);
            //     paths.push(file_crawl((path + "/" + item), paths));

        }
    });
    paths.push(path);
    paths.push(current_files);

    // console.log(current_files)
    current_paths.forEach((item) => {
        let full_path = (path + "/" + item);
        let item_stats = fs.lstatSync(full_path);

        if (item_stats.isDirectory()) {
            // console.log(`\n ${full_path} ->`);
            //     // console.log(`${item} is dir: ${item_stats.isDirectory()}`);
            //     console.log(`recursing to  ${full_path}, current results: ${paths}`);
            // console.log("recursing on " + full_path);
            paths.push(file_crawl(full_path, []));

        }

    });

    // console.log("New return: ");
    // console.log(paths);

    return paths;
}

// console.table(`----------------------------------------------------------- \n`);
// console.log(all_files);




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
    const is_absolute_path = filepath.includes(__dirname) && filepath.includes(base_path);

    console.log(`TEST ACCESS: Test path is absolute : ${filepath.includes(__dirname)}`);

    const absolute_path = path.join((path.join(__dirname, `\\/${base_path}`)), filepath);
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

const createFileStream = (filepath, fileEncoding = null) => {
    return (new Promise((resolve, reject) => {
        // if(path.extname(filepath) == '.png') {
        //     fileEncoding = "binary"
        //     console.log(`FILE STREAM: setting png encoding`);

        // }
        let result = [];
        fs.createReadStream(filepath, { encoding: fileEncoding })
            .on("open", () => {
                console.log(`FILE STREAM: Function; Reading from ${filepath} with encoding ${fileEncoding}`);
            })
            .on("data", (chunk) => {
                result.push(chunk);
                //console.log("chunk added");
            })
            .on("end", () => {
                console.log(`FILE STREAM: promise resolved for ${filepath}`);
                if (path.extname(filepath) == '.png') {
                    // console.log("FILE STREAM: PNG data " + result);
                }
                let concat_result = Buffer.concat(result)
                resolve(concat_result);

            })
            .on("error", error => {
                console.log("FILE STREAM: " + error);
                reject(error)
            });
    }))
}


if (testFileAccess("site_map.json")) {
    fs.unlink("dist/site_map.json", (err) => {
        if (err) {
            console.log(err);
        }
        // console.log("deleting old map");
        fs.appendFileSync("dist/site_map.json", JSON.stringify(all_files, false, 4));

    });

} else
{
    // console.log("did not delete old");
    fs.appendFileSync("dist/site_map.json", JSON.stringify(all_files, false, 4));    
}


//Turns out JSON stringify does this, lesson learned..
function site_mapper(array_map, output_file) {

    let files = [];
    let folders = [];
    fs.appendFileSync(output_file, `{\n`);

    array_map.forEach((item) => {
        if (typeof item == "string") {
            // fs.appendFileSync(output_file, `\"${item}\",`);
            files.push(item);
        }
        else if (typeof item == "array") {
            folders.push(item);
        }
    });

    for (let i = 0; i < files.length; i++) {
        fs.appendFileSync(output_file, `\"${files[i]}\"`);
        if (i < (files.length - 1)) {
            fs.appendFileSync(output_file, `,`);
        }

        // else {
        //     fs.appendFileSync(output_file, `\n}`);

        // }
    }
}
//Hand reading index.html 
fs.readFile("./index.html", { encoding: "utf8" }, (err, html) => { if (err) { } else { entry_file = html; console.log(); } });

console.log(`BASE PATH: ${base_path} __dirname: ${__dirname}`);


function get_handler(req, res) {
    let method = req.method, url = req.url, headers = req.headers;
    //replacing %20 with spaces in url string to deal with encoding rules
    const utf8_space = /%20/gi;
    if(url.search(utf8_space) !== -1){
        url = url.replaceAll(utf8_space, " ");
    }

    console.log("Main Loop;  request start: " + method + " " + url);


    let true_path;
    const basepath_regex = new RegExp(base_path)

    if (basepath_regex.test(url)) {
        true_path = path.join(__dirname, url);
    }
    else {
        true_path = path.join((path.join(__dirname, `\\${base_path}`)), url);
    }
    const contentType = getContentType(true_path);
    const path_accesible = testFileAccess(true_path);



    console.log(`Main Loop;  true path: ${true_path}, accessible: ${path_accesible}, url conversion ${URL.createObjectURL(new Blob([true_path]))}`);


    if (method == "GET") {

        if (routes.includes(url.toLowerCase())) {
            res.setHeader("Content-Type", "text/html")
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

        // else if(url == "/e665b3312091b32d.png"){
        //     res.writeHead(200, {
        //         "Content-Type": contentType
        //     });

        //     // Reading the file
        //     fs.readFile(true_path,
        //         function (err, content) {
        //             // Serving the image
        //             res.end(content);
        //         });
        // }

        else if (path_accesible) {
            console.log("Main Loop; caught a GET with url: " + url);
            console.log("Main Loop; true path: " + true_path);

            console.log(`Main Loop; path accessible return: ${path_accesible}`);



            console.log(`Main Loop; Content type return : ${contentType}`);

            // res.setHeader("StatusCode", 200)
            res.statusCode = 200;
            // res.setHeader("Content-Encoding", "utf-8");

            res.setHeader("Content-Type", contentType);
            // if(contentType == "image/png"){
            //     res.setHeader("Content-Encoding", "utf-8");
            // }
            // if(true_path.includes("png")){
            //     res.setHeader("Content-Encoding", "chunk");
            // }


            let readFilePromise = createFileStream(true_path);
            readFilePromise.then((data) => {
                console.log(`Main Loop; sending file: ${true_path}, data length: ${data.length}, bufferBytelength data: ${Buffer.byteLength(data)}`);
                res.setHeader("Content-Length", Buffer.byteLength(data));
                res.write(data, () => {
                    // console.log("Main Loop; chunk print " + data.slice(0, 500));
                });
                res.end();
                console.log("Main Loop; Sent file" + "Content-Length" + data.length);

                let headers = res.getHeaders();


                try {
                    console.log("Main Loop; headers");
                    for (const key in headers) {
                        console.log(`${key}: ${headers[key]}`);
                    };
                }
                catch (error) {
                    console.log("header print error " + error)
                };
            });


            //console.log("ending response");
            //res.end("server82");
        }
        else {
            // res.setHeader("StatusCode", 500)
            res.statusCode = 404;
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
    // console.log("Request recieved!");
    get_handler(req, res);
})
server.listen(8080);

//closing server and exiting program after specified milliseconds for testing
//setTimeout(() => { console.log("killing server"); server.close; process.exit(); }, 20000);