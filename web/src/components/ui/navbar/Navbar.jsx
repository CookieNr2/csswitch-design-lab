import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar bg-navbar py-3 border-body" data-bs-theme="dark">
      <div className="container">
        <div className="d-flex align-items-center">
          <a className="navbar-brand">CSSwitch Design Lab</a>
          <a
            className="nav-link link-light mb-0"
            aria-current="page"
            href="#inspiration"
          >
            <i className="bi bi-lightbulb-fill px-1"></i>
            <span className="d-sm-none d-md-inline">Find Inspiration</span>
          </a>
        </div>
        <div>
          <a
            href="#inspiration"
            className="btn btn-link link-light text-decoration-none mx-1"
          >
            <i className="bi bi-person-circle"></i> Login
          </a>
          <a href="#inspiration" className="btn btn-primary rounded-0 mx-1">
            <i className="bi bi-person-fill-add"></i> Sing up
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
