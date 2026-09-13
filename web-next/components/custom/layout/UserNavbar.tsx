"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/profile/configurations", label: "My Configurations" },
  { href: "/profile/data", label: "My Data" },
] as const;

const UserNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-neutral-800 md:w-56 md:shrink-0">
      <ul className="flex md:flex-col">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block px-4 py-8 text-center md:text-left",
                  active
                    ? "bg-neutral-700 font-semibold text-white"
                    : "text-white/80 hover:text-white"
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default UserNavbar;
