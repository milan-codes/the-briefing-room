import { ReactNode } from "react";

export interface FeatureBlockProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ title, description, icon }) => (
  <div className="flex items-start">
    <span className="flex-shrink-0 rounded-lg bg-gray-800 text-gray-100 p-4">{icon}</span>

    <div className="ml-4">
      <h2 className="text-gray-100 text-lg font-bold">{title}</h2>

      <p className="text-gray-300 mt-1 text-sm">{description}</p>
    </div>
  </div>
);

export default FeatureBlock;
