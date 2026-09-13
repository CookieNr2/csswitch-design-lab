import "@/styles/navbar.css";
import Link from "next/link";
import { Suspense } from "react";
import NavbarAuth, { NavbarAuthFallback } from "./NavbarAuth";

/** Static shell. Everything request-dependent lives behind the Suspense boundary. */
const Navbar = () => (
  <nav className="navbar bg-navbar py-3 border-body" data-bs-theme="dark">
    <div className="container">
      <div className="d-flex align-items-center">
        <Link className="navbar-brand" href="/">
          CSSwitch Design Lab
        </Link>
        <Link className="nav-link link-light mb-0" href="/inspiration">
          <i className="bi bi-lightbulb-fill px-1" />
          <span className="d-sm-none d-md-inline">Find Inspiration</span>
        </Link>
      </div>
      <ul className="mb-0 d-flex align-items-center list-unstyled">
        <Suspense fallback={<NavbarAuthFallback />}>
          <NavbarAuth />
        </Suspense>
      </ul>
    </div>
  </nav>
);

export default Navbar;
