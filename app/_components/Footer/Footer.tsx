import { BrandGithub } from "tabler-icons-react";
import FooterGroup, { FooterGroupProps } from "./FooterGroup";
import Disclaimer from "./Disclaimer";

const Footer: React.FC = () => (
  <footer aria-label="Site footer">
    <div className="mx-auto max-w-screen-lg pt-16 pb-6 px-4 lg:pt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-center text-blue-600 font-extrabold sm:justify-start">
            The Briefing Room 🏎️
          </div>

          <p className="text-gray-700 dark:text-gray-300 mx-auto mt-6 max-w-md text-center leading-relaxed sm:mx-0 sm:max-w-xs sm:text-left">
            Analyse data from any F1 session starting from the 2021 season. Access historical
            statistics back until the 1950 season.
          </p>

          <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
            <li>
              <a
                href="https://github.com/milan-codes/the-briefing-room"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 dark:text-gray-300 transition hover:text-gray-700/75 dark:hover:text-gray-300/75"
              >
                <span className="sr-only">GitHub</span>
                <BrandGithub />
              </a>
            </li>
          </ul>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {footerGroups.map((group, index) => (
            <FooterGroup key={index} {...group} />
          ))}
        </div>
      </div>

      <Disclaimer />
    </div>
  </footer>
);

const footerGroups: FooterGroupProps[] = [
  {
    title: "Site map",
    links: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Season Hub",
        href: "/season-hub",
      },
      {
        title: "Telemetry",
        href: "/telemetry",
      },
      {
        title: "Archive",
        href: "/archive",
      },
    ],
  },
  {
    title: "About",
    links: [
      {
        title: "Features",
        href: "/#features",
      },
      {
        title: "FAQ",
        href: "/#faq",
      },
    ],
  },
  {
    title: "Project",
    links: [
      {
        title: "GitHub (frontend)",
        href: "https://github.com/milan-codes/the-briefing-room",
      },
      {
        title: "GitHub (backend)",
        href: "https://github.com/milan-codes/the-briefing-room-api",
      },
    ],
  },
];

export default Footer;
