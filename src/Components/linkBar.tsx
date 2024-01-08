import React from "react";

class LinkBar extends React.Component {

  render() {
    const dev = true;
    let musicLink;
    let galleryLink;
    let diverseLink;

    if (dev) {
      musicLink = <a className="nav-link" href={`/Music`}>Musikk</a>
      galleryLink = <a className="nav-link" href={`/Gallery`}>Musikk</a>
    }
    else {
      musicLink = <a className="nav-link" href={`/ComingSoon`}>Musikk</a>
      galleryLink = <a className="nav-link" href={`/ComingSoon`}>Musikk</a>
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
        <a className="nav-link">Diverse</a>
        <a className="nav-link" href="https://github.com/MSparstad/">GitHub</a>
      </nav>

    );

  }
}

export default LinkBar;
