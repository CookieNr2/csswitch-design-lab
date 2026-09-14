import Link from "next/link";
import { CircleUser, LogOut, UserPlus } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { logoutAction } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/server/auth";

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
        <li>
          <Button asChild variant="ghost" className="h-9 rounded-none">
            <Link href="/login">
              <CircleUser aria-hidden="true" />
              <span className="hidden md:inline">Login</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button asChild className="h-9 rounded-none">
            <Link href="/register">
              <UserPlus aria-hidden="true" />
              <span className="hidden md:inline">Register</span>
            </Link>
          </Button>
        </li>
      </>
    );
  }

  return (
    <>
      <li>
        <Button asChild variant="ghost" className="h-9 rounded-none">
          <Link href="/profile/configurations">
            <CircleUser aria-hidden="true" />
            <span className="hidden md:inline">My Account</span>
          </Link>
        </Button>
      </li>
      <li>
        <form action={logoutAction}>
          <Button type="submit" variant="ghost" className="h-9 rounded-none">
            <LogOut aria-hidden="true" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </form>
      </li>
    </>
  );
};

/** Occupies the same space while the session is resolved, to avoid a jump. */
export const NavbarAuthFallback = () => (
  <li aria-hidden="true" className="h-9 w-24" />
);

export default NavbarAuth;
