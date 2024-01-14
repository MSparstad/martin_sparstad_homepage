import React from "react";
import Footer from "./Components/footer";
import Header from "./Components/header";
import ImageGallery from "react-image-gallery";
import sadFox from "./assets/taxidermy.png"



// const fs = require('fs'); 
// fs.readdir("./assets/old_shit",(err, files)=>console.log(files)){}

const images = [{original:sadFox, thumbnail:""},{original:sadFox, thumbnail:sadFox},{original:sadFox, thumbnail:sadFox}];

const modules = import.meta.glob('./assets/old_shit/*.png', { eager: true, as:"raw", });

for(let i in modules){
  console.log(i);
  images.push({original:"src/" + i, thumbnail: "src/" + i})
}

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
            <ImageGallery  items={images} showThumbnails={true} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Gallery;