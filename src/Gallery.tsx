import React from "react";
import Footer from "./Components/footer";
import Header from "./Components/header";
import ImageGallery from "../node_modules/react-image-gallery/build/image-gallery.js";
import getResource from "./hooks/fetcher.mjs";
// import "react-image-gallery/styles/css/image-gallery.css";
import sadFox from "./assets/taxidermy.png";
// import old_images from "./assets/old_shit/*.png";



// const fs = require('fs'); 
// fs.readdir("./assets/old_shit",(err, files)=>console.log(files)){}

const images = [];
let json_map = null;

fetch('./site_map.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    json_map = data;
    return json_map
  })
  .then((map) => {
    json_map = Array.from(map);
    console.log(images.length, "length pre", "map ", json_map, "map type ", typeof json_map);
    console.log("HELLO ", getResource("./dist/assets/old_shit/titan lads.png", json_map))
    getResource("./dist/assets/old_shit", json_map)
      .then((image) => {
        console.log("img ", image);
        for(let item in image){
        images.push({ original: image[item].value, thumbnail: image[item].value});
      }
        
        console.log(images.length, "length post", images);
      });
  })
  .catch(error => console.error(error));


// json_map.findIndex("./dist/assets/old_shit");

//const modules = img_server.image_folder;
//const modules = import.meta.glob('./assets/old_shit/*.png', { eager: true, as:"raw", });
let test_fetch = fetch("dist/assets/old_shit/Cataclysm_gunstore_massacre.png");
test_fetch.then((response) => {
  // console.log("01 promising fetch");
  if (!response.ok) {
    // console.log("02 " + response.toString());
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  else {
    // console.log("03 ");
    // console.log(response);
    return response.blob();
  }
})
  .then((res3) => {
    console.log("04 ", res3);
    let url = URL.createObjectURL(res3);
    console.log("05 ", url);
    images.push({ original: url, thumbnail: url });
  });

// for (let i in images) {
//   // console.log(i);
//   images.push({ original: images[i].original, thumbnail: images[i].original })
// }



// .then((image) => {
//   console.log(`image: ${image}`);
//   images.push({original: image, thumbnail: ""});
// })



class Gallery extends React.Component {
  constructor(props: any) {
    super(props);
    //console.log(modules);
  }

  render() {
    return (
      <div className="body-wrapper">
        <Header />
        <main>
          <div className="gallery-container">
            <div className="gallery-head">
              <h1 className="gallery-h1">Gallery</h1>
            </div>
            <div className="categories-container">
              <div className="categories-div">
                <div className="category">
                  <span>Kategori 1</span>
                </div>
                <div className="category">
                  <span>Kategori 2</span>
                </div>
                <div className="category">
                  <span>Kategori 3</span>
                </div>
                <div className="category">
                  <span>Kategori 4</span>
                </div>
                <div className="category">
                  <span>Kategori 5</span>
                </div>
                <div className="category">
                  <span>Kategori 6</span>
                </div>
                <div className="category">
                  <span>Kategori 7</span>
                </div>
                <div className="category">
                  <span>Kategori 8</span>
                </div>
              </div>
            </div>
            <ImageGallery items={images} showThumbnails={true} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Gallery;