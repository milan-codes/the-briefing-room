import Link from "next/link";
import { UrlObject } from "url";

interface FooterLinkProps {
  label: string;
  href: string | UrlObject;
}

export interface FooterGroupProps {
  groupTitle: string;
  links: FooterLinkProps[];
}

const FooterGroup: React.FC<FooterGroupProps> = ({ groupTitle, links }) => (
  <div>
    <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{groupTitle}</p>

    <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
      {links.map(({ label: title, href }, index) => (
        <Link key={index} href={href}>
          <a className="text-gray-700 dark:text-gray-300">{title}</a>
        </Link>
      ))}
    </nav>
  </div>
);

export default FooterGroup;
