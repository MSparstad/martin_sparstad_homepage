function LinkBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-item-outer">
        <a className="nav-link" href="./">
          <span>Hjem</span>
        </a>
      </div>
      <a className="nav-link" href={`/Music`}>
        Musikk
      </a>
      <a className="nav-link" href={`/Gallery`}>Galleri</a>
      <a className="nav-link">Diverse</a>
      <a className="nav-link">GitHub</a>
    </nav>
  );
}

export default LinkBar;
