import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../../contexts/auth.context";
import "./navbar.css";

function Navbar() {
  const { user, doLogout } = useContext(AuthContext);

  return (
    <nav className="navbar bg-navbar py-3 border-body" data-bs-theme="dark">
      <div className="container">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand" to="/">
            CSSwitch Design Lab
          </Link>
          <a
            className="nav-link link-light mb-0"
            aria-current="page"
            href="/inspiration"
          >
            <i className="bi bi-lightbulb-fill px-1"></i>
            <span className="d-sm-none d-md-inline">Find Inspiration</span>
          </a>
        </div>
        <ul className="mb-0">
          {user ? (
            <>
              <li className="btn btn-link link-light text-decoration-none mx-1">
                <NavLink to="/profile/configurations">
                  <i className="bi bi-person-circle"></i>
                  <span className="d-sm-none d-md-inline"> My Account</span>
                </NavLink>
              </li>
              <li className="btn btn-link link-light text-decoration-none mx-1">
                <NavLink to="/login" onClick={doLogout}>
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span className="d-sm-none d-md-inline"> Logout</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="btn btn-link link-light text-decoration-none mx-1">
                <NavLink to="/login">
                  <i className="bi bi-person-circle"></i>
                  <span className="d-sm-none d-md-inline"> Login</span>
                </NavLink>
              </li>
              <li className="btn btn-primary rounded-0 mx-1">
                <NavLink to="/register">
                  <i className="bi bi-person-fill-add"></i>
                  <span className="d-sm-none d-md-inline"> Register</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
