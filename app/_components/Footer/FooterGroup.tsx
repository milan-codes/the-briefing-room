import FooterGroupLinks, { FooterGroupLink } from "./FooterGroupLinks";

export interface FooterGroupProps {
  title: string;
  links: FooterGroupLink[];
}

const FooterGroup: React.FC<FooterGroupProps> = ({ title, links }) => {
  return (
    <div className="text-center sm:text-left">
      <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</p>

      <FooterGroupLinks links={links} />
    </div>
  );
};

export default FooterGroup;
