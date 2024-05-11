import { Link, NavLink } from "react-router-dom";

function UserNavbar({ activeTab }) {
  return (
    <div className="sub-nav col-sm-2 col-md-2 col-lg-2 px-0">
      <ul className="nav flex-column">
        <li className="py-5">
          <NavLink
            to="/profile/configurations"
            className={`nav-link link-light ${
              activeTab === "My configurations" ? "active" : ""
            }`}
          >
            My Configurations
          </NavLink>
        </li>
        <li className="py-5">
          <NavLink
            to="/profile/data"
            className={`nav-link link-light ${
              activeTab === "My data" ? "active" : ""
            }`}
          >
            My Data
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UserNavbar;
