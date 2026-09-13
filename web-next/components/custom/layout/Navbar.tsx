import Link from "next/link";
import { Suspense } from "react";
import { Lightbulb } from "lucide-react";
import NavbarAuth, { NavbarAuthFallback } from "./NavbarAuth";

/** Static shell. Everything request-dependent lives behind the Suspense boundary. */
const Navbar = () => (
  <nav className="bg-neutral-800 py-3">
    <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-lg font-black text-white">
          CSSwitch Design Lab
        </Link>
        <Link
          href="/inspiration"
          className="inline-flex items-center gap-1.5 text-sm text-white hover:text-emerald-400"
        >
          <Lightbulb className="size-4" aria-hidden="true" />
          <span className="hidden md:inline">Find Inspiration</span>
        </Link>
      </div>
      <ul className="flex items-center gap-2">
        <Suspense fallback={<NavbarAuthFallback />}>
          <NavbarAuth />
        </Suspense>
      </ul>
    </div>
  </nav>
);

export default Navbar;
