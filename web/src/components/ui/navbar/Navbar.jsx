import "./navbar.css";

function Navbar() {
  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Navbar CSSwitch
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#inspiration">
                Inspiration from others
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
