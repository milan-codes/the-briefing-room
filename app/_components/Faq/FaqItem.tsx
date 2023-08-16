import { ChevronDown } from "tabler-icons-react";

export interface FaqItemProps {
  title: string;
  description: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ title, description }) => (
  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer">
      <h2 className="text-gray-900 dark:text-gray-100 font-medium">{title}</h2>
      <ChevronDown className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180 text-gray-900 dark:text-gray-100" />
    </summary>

    <p className="px-4 mt-4 leading-relaxed text-gray-600 dark:text-gray-400">{description}</p>
  </details>
);

export default FaqItem;
