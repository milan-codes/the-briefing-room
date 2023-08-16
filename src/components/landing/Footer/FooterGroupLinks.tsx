import Link from "next/link";

export type FooterGroupLink = {
  title: string;
  href: string;
};

interface FooterGroupLinksProps {
  links: FooterGroupLink[];
}

const FooterGroupLinks: React.FC<FooterGroupLinksProps> = ({ links }) => {
  const linkStyle =
    "text-gray-500 dark:text-gray-400 transition hover:text-gray-500/75 dark:hover:text-gray-400/75";
  return (
    <nav aria-label="Footer navigation" className="mt-8">
      <ul className="space-y-4 text-sm">
        {links.map((link, index) => (
          <li key={index}>
            {link.href.startsWith("/") ? (
              <Link href={link.href} className={linkStyle}>
                {link.title}
              </Link>
            ) : (
              <a className={linkStyle} href={link.href}>
                {link.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterGroupLinks;
