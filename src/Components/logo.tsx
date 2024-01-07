import React from "react";
import Logo from "../assets/logo.svg?react";

function Logoimg() {
  return (
    <div className="logo">
      {/* <img className="logo-img" alt="M Logo" src="Logo"></img> */}
      <Logo className="logo-img" />
      <span className="logo-name">Martin Sparstad</span>
    </div>
  );
}

export default Logoimg;