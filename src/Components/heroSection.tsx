import React from "react";
import Decoration from "./decoration";
import HeroIndex from "./heroIndex";

function HeroSection() {
  return (
    <div className="container hero">
      <div className="hero-wrapper">
        <HeroIndex />
        <Decoration />
      </div>
    </div>
  );
}

export default HeroSection;
