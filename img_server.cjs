const fs = require("fs");
const path = require("path");
const image_folder = fs.readdirSync("./src/assets/old_shit");
//console.log(image_folder);
module.exports = image_folder;
console.log(module);
