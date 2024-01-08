import React from "react";
import Footer from "./Components/footer";
import Header from "./Components/header";

class Gallery extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render(){return (
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
            </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}}

export default Gallery;