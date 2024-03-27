import { useState, useEffect } from 'react';

export function isFile(path) {
    if (/\.[a-z]{1,4}$/.test(path)) {
        // console.log(`regex on ${path} result = `, /\.[a-z]{1,4}$/.test(path));
        return true;
    }
    else {
        return false;
    }
}

export async function getResource(path, map) {
    let promises;

    if (isFile(path)) {
        // console.log("fetching file at: " + path);
        let item = await fetch(path);
        // console.log(item);
        let blob = await item.blob();
        // console.log(blob);
        
        return URL.createObjectURL(blob);
        
    }

    else if (/dist/.test(String(path))) {
        // console.log("map ", map[1][0]);
        // console.log("String test ", typeof map[0]);
        // console.log("index ", map.indexOf(path));

        if (typeof path == "string") {
            // console.log("Starting recursion");
            // console.log(findNodeRecursive(path, map, []));
            // console.log(map[2][2][1])
            promises = []
            let paths_to_fetch = accessMap(map, findNodeRecursive(path, map, []));
            for(let currentpath in paths_to_fetch){
                // console.log("paths to fetch: ", paths_to_fetch[currentpath]);
                promises.push(getResource(paths_to_fetch[currentpath], map));
                
            }
        }
    }
    console.log(promises)
    return Promise.allSettled(promises);
}

const testTarget = "dist/assets/old_shit";


//Traverses given site_map(nested array structure) for target string, returns array of indices to target
/**
 * @param {string} target
 * @param {any[]} array
 * @param {any[]} indices
 */
export function findNodeRecursive(target, array, indices) {
    let current_indices = indices;

    for (let i = 0; i < array.length; i++) {
        // console.log("item: ", array[i]);
        if (typeof array[i] === "string") {
            // console.log("skipping string ", array[i]);

            continue;
        }

        if (array.indexOf(target) !== -1) {
            // console.log("returning target indices");
            current_indices.push((array.indexOf(target) + 1));

            //removing unnecessary entry from return
            // current_indices.pop();
            // console.log("return value: ", current_indices);
            return current_indices;
        }
        else {
            current_indices.push(i);
            // console.log("recursing on indices: ", current_indices);
            if (findNodeRecursive(target, array[i], current_indices)) {
                return current_indices;
            }
            else {
                current_indices.pop();
            }

        }
    }

    // console.log("reached leaf, popping!");
    // console.log("CURRENT INDICES ", current_indices);

}

//map: multi-level array we are indexing into
//indices: array of indices indicating position we want to retrieve
export function accessMap(map, indices) {

    let currentPlaceInArray;

    for (let i = 0; i < indices.length; i++) {
        let current_index = indices[i];
        //   currentPlaceInArray = currentPlaceInArray ? currentPlaceInArray[place] : indices[place];
        currentPlaceInArray = currentPlaceInArray ? currentPlaceInArray[current_index] : map[current_index];
    }

    // console.log("current place: ", currentPlaceInArray);
    return currentPlaceInArray;

}
