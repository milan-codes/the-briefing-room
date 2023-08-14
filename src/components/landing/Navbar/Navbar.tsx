import Link from "next/link";
import NavbarLinks from "./NavbarLinks";

const Navbar: React.FC = () => (
  <header aria-label="Site navigation bar">
    <div className="mx-auto max-w-screen-lg px-4">
      <div className="flex h-16 items-center justify-between">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <Link href="/">
            <a className="inline-flex px-3 py-1 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-blue-600 font-semibold">
              <span className="hidden sm:block">The Briefing Room &nbsp;</span>🏎️
            </a>
          </Link>
        </div>
        <NavbarLinks />
      </div>
    </div>
  </header>
);

export default Navbar;
