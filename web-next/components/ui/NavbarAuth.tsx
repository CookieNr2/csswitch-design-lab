import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/auth";

/**
 * The only part of the chrome that depends on the request. Kept in its own
 * component so reading cookies here does not force the whole page to render
 * dynamically -- under PPR this is the hole that streams in.
 */
const NavbarAuth = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <li className="btn btn-link link-light text-decoration-none mx-1">
          <Link href="/login">
            <i className="bi bi-person-circle" />
            <span className="d-sm-none d-md-inline"> Login</span>
          </Link>
        </li>
        <li className="btn btn-primary rounded-0 mx-1">
          <Link href="/register">
            <i className="bi bi-person-fill-add" />
            <span className="d-sm-none d-md-inline"> Register</span>
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className="btn btn-link link-light text-decoration-none mx-1">
        <Link href="/profile/configurations">
          <i className="bi bi-person-circle" />
          <span className="d-sm-none d-md-inline"> My Account</span>
        </Link>
      </li>
      <li className="mx-1">
        <form action={logoutAction}>
          <button type="submit" className="btn btn-link link-light text-decoration-none">
            <i className="bi bi-box-arrow-in-right" />
            <span className="d-sm-none d-md-inline"> Logout</span>
          </button>
        </form>
      </li>
    </>
  );
};

/** Occupies the same space while the session is resolved, to avoid a jump. */
export const NavbarAuthFallback = () => (
  <li className="btn btn-link link-light text-decoration-none mx-1" aria-hidden="true">
    <i className="bi bi-person-circle" />
    <span className="d-sm-none d-md-inline"> &nbsp;</span>
  </li>
);

export default NavbarAuth;
