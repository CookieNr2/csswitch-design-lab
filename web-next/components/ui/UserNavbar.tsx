"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/profile/configurations", label: "My Configurations" },
  { href: "/profile/data", label: "My Data" },
] as const;

const UserNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="sub-nav col-sm-2 col-md-2 col-lg-2 px-0">
      <ul className="nav flex-column">
        {TABS.map((tab) => (
          <li key={tab.href} className="py-5">
            <Link
              href={tab.href}
              aria-current={pathname === tab.href ? "page" : undefined}
              className={`nav-link link-light ${pathname === tab.href ? "active" : ""}`}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserNavbar;
