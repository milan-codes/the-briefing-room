import FooterGroup, { FooterGroupProps } from "./FooterGroup";

interface FooterProps {
  description: string;
  groups: FooterGroupProps[];
}

const Footer: React.FC<FooterProps> = ({ description, groups }) => (
  <footer className="bg-sky-50 dark:bg-gray-900">
    <div className="max-w-5xl px-6 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between sm:flex-row">
        <div>
          <div className="font-bold text-gray-800 dark:text-gray-200">Formula 1 Telemetry</div>

          <p className="max-w-xs mt-4 text-sm text-gray-700 dark:text-gray-300">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          {groups.map(({ groupTitle, links }, index) => (
            <FooterGroup key={index} groupTitle={groupTitle} links={links} />
          ))}
        </div>
      </div>

      <p className="mt-16 text-xs text-gray-700 dark:text-gray-300">
        Made by Milán Herke, a fellow F1 fan. <br />
        The creator of this website is in no way, shape or form linked to FORMULA 1, Liberty Media,
        the FIA or any other organization. This website was created only for fun, and educational
        purposes and it does not generate any revenue. All rights belong to their respective owners.
        Data provided by{" "}
        <a href="https://theoehrly.github.io/Fast-F1/" target="_blank" className="underline">
          FastF1
        </a>
        .
      </p>
    </div>
  </footer>
);

export default Footer;
