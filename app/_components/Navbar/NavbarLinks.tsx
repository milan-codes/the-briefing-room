import Link from "next/link";

const NavbarLinks: React.FC = () => (
  <nav aria-label="Site navigation links" className="flex items-center gap-12">
    <ul className="flex items-center gap-6 text-sm">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className="text-gray-500 dark:text-gray-400 transition hover:text-gray-500/75 dark:hover:text-gray-400/75"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Season Hub",
    href: "/season-hub",
  },
  {
    name: "Telemetry",
    href: "/telemetry",
  },
  {
    name: "Archive",
    href: "/archive",
  },
];

export default NavbarLinks;
