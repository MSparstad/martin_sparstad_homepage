import React from "react";
import { Outlet, Link } from "react-router-dom";

class LinkBar extends React.Component {

  render() {
    const dev = true;
    let musicLink;
    let galleryLink;
    let diverseLink;
    let miscLink;

    if (dev) {
      // musicLink = <a className="nav-link" href={`/Music`}>Musikk</a>
      musicLink = <Link to={"/music"}>Music</Link>
      // galleryLink = <a className="nav-link" href={`/Gallery`}>Galleri</a>
      galleryLink = <Link to={"/Gallery"}>Gallery</Link>
      miscLink = <a className="nav-link" href={`/comingSoon`}>Diverse</a>
    }
    else {
      // musicLink = <a className="nav-link" href={`/ComingSoon`}>Musikk</a>
      musicLink = <Link to={"/music"}>Music</Link>
      galleryLink = <Link to={"/comingSoon"}>Galleri</Link>
      miscLink = <Link to={"/comingSoon"}>Diverse</Link>
    }
    return (
      <nav className="nav-bar">
        <div className="nav-item-outer">
          <a className="nav-link" href="./">
            <span>Hjem</span>
          </a>
        </div>

        <div className="nav-item-outer">
          {musicLink}
        </div>

        <div className="nav-item-outer">
        {galleryLink}
        </div>
        <div className="nav-item-outer">
          {miscLink}
        </div>
        <a className="nav-link" href="https://github.com/MSparstad/">GitHub</a>
      </nav>

    );

  }
}

export default LinkBar;
