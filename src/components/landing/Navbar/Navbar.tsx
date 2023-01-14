import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { UrlObject } from "url";
import NavbarButton from "./NavbarButton";

interface LinkProps {
  name: string;
  href: string | UrlObject;
}

interface NavbarProps {
  links: LinkProps[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => (
  <Disclosure as="nav" className="bg-[#FCFCFF] dark:bg-[#0A0F0D] px-2 sm:px-0">
    {({ open }) => (
      <>
        <div className="max-w-5xl mx-auto h-16 relative flex items-center justify-start">
          {/* Mobile Navigation Menu button */}
          <Disclosure.Button className="p-2 rounded-md duration-200 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 sm:hidden">
            {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Disclosure.Button>

          {/* Logo */}
          <div className="font-bold flex items-center px-2 text-gray-800 dark:text-gray-200">
            Formula 1 Telemetry
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:px-8">
            {links.map(({ name, href }, index) => (
              <Link href={href} key={index}>
                <a className="px-4 py-2 mx-1 rounded-md duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">
                  {name}
                </a>
              </Link>
            ))}
          </div>

          {/* Action button */}
          <div className="flex items-center absolute inset-y-0 right-0">
            <NavbarButton />
          </div>
        </div>

        {/* Mobile Navigation Menu*/}
        <Disclosure.Panel className="sm:hidden">
          <div className="flex flex-col pb-3">
            {links.map(({ name, href }, index) => (
              <Disclosure.Button key={index} as={Link} href={href}>
                <a className="px-3 py-2 my-1 rounded-md duration-200 text-gray-200 hover:bg-gray-900">
                  {name}
                </a>
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
);

export default Navbar;
