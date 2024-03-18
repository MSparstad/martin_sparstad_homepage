import { useState, useEffect } from 'react';


async function getResource(path, map) {
    if (/\.[a-z]{1,4}$/.test(String(path))) {
        console.log("fetching file at: " + path);
        let item = await fetch(path);
        console.log(item);
        let blob = await item.blob()
        console.log(blob);
        return URL.createObjectURL(blob);
    }
}

export default getResource;