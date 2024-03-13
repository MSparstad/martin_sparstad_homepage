import React from "react";
import Logoimg from "./logo";
import LinkBar from "./linkBar";
import Theme from "./theme";

class Header extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <header className="navigation container">
        <div className="nav-wrapper">
          <Logoimg />
          <LinkBar />
        </div>
        <Theme />
      </header>
    );
  }
}

export default Header;
