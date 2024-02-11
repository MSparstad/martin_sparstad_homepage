import React from "react";
import hero_img_url from "../assets/shaded_shapes.png"

function Decoration() {
  return (
    <div className="decoration">
      <img
        className="image hero-image"
        src= {hero_img_url}
        alt="image of headphones with html tags between them"
      />

    </div>
  );
}

export default Decoration;