import { useEffect, useState } from "react";
import Footer from "./Components/footer";
import Header from "./Components/header";
import Category from "./Components/category";
import ImageGallery from "../node_modules/react-image-gallery/build/image-gallery.js";
import { getResource, findNodeRecursive, accessMap, isFile } from "./hooks/fetcher.mjs";
// import "react-image-gallery/styles/css/image-gallery.css";
import sadFox from "./assets/taxidermy.png";



// const images = [];
const response = await fetch("./site_map.json");
const json_map = await response.json();

//fetch the json site map & images for initial category

// let resolved_image_promises = await getResource("./dist/assets/gallery/old_shit", json_map);

// resolved_image_promises.forEach(element => {
//   images.push({original: element.value, thumbnail: element.value});
// });

console.log(json_map);
// console.log("images: ", images);

let access_indices = findNodeRecursive("./dist/assets/gallery", json_map, []);
access_indices.pop();


let gallery_folder = accessMap(json_map, access_indices);
console.log("gallery folder ", gallery_folder[2][1]);

console.log("for");

async function categoryLoader(path, map) {
  const response = await getResource(path);
}

// console.log("await test: ", await getResource("./dist/assets/old_shit/titan lads.png", json_map));

console.log(await getResource(gallery_folder[2][0], json_map));

function Gallery() {

  const [activeCategory, setActiveCategory] = useState(2);
  const [images, setImages] = useState([]);
  const categories = [];
  useEffect(() => {    
    async function getCategory() {
      let img_array = [];
      console.log("get resources on: ", gallery_folder[activeCategory][0]);
      let promise_array = await getResource(gallery_folder[activeCategory][0], json_map);
      console.log("promises ", promise_array);
      promise_array.forEach((element) => {
        img_array.push({ original: element.value, thumbnail: element.value });
      });
      console.log("images: ", img_array);
      if(!ignore){
      setImages(img_array);
      }
    }
    let ignore = false;
    getCategory()
    return() => {
      ignore = true;
    }
      // return <ImageGallery items={img_array} showThumbnails={true} />;
    
  }, [activeCategory]);

  //Create a category for each subfolder of our gallery_folder
  for (let i = 2; i < gallery_folder.length; i++) {
    // console.log(gallery_folder);
    if (!isFile(gallery_folder[i][0])) {
      let name = gallery_folder[i][0];

      console.log("is folder: ", gallery_folder[i][0]);
      // console.log("regex: ", (gallery_folder[i][0]).match(/(?<=\/).*)/));

      categories.push(

        <Category key={i} category_path={name} is_active={activeCategory === i} onActive={() => setActiveCategory(i)} />

      );
    }
  }

  //fetch images for current category

  // async function getCategory() {
  //   let img_array = [];
  //   console.log("get resources on: ", gallery_folder[activeCategory][0]);
  //   let promise_array = await getResource(gallery_folder[activeCategory][0], json_map);
  //   console.log("promises ", promise_array);
  //   promise_array.forEach((element) => {
  //     img_array.push({ original: element.value, thumbail: element.value });
  //   });
  //   console.log("images: ", img_array);
  //   return <ImageGallery items={img_array} showThumbnails={true} />;

  // }


  console.log("cats ", categories);
  // console.log(getCategory());
  return (
    <div className="body-wrapper">
      <Header />
      <main>
        <div className="gallery-container">

          <div className="categories-container">
            <div className="categories-div">

              {categories}

            </div>
          </div>
          <ImageGallery items={images} showThumbnails={true} />
          {/* {images} */}
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default Gallery;