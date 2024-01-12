import React from "react";
import Theme_Toggle from "../assets/theme_toggle_03.svg?react";

function Theme() {
  return (
    <div className="theme-swap">
      <button id="theme-toggle">
         <Theme_Toggle className="theme-img" />
      </button>
    </div>
  );
}
export default Theme;
