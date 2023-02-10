export interface FaqItemProps {
  title: string;
  description: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ title, description }) => (
  <details className="group [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-gray-50">
      <h2 className="font-medium text-gray-900">{title}</h2>
      <svg
        className="ml-1.5 h-5 w-5 flex-shrink-0 transition duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>

    <p className="px-4 mt-4 leading-relaxed text-gray-700">{description}</p>
  </details>
);

export default FaqItem;
