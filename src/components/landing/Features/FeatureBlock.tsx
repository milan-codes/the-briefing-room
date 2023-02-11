import { ReactNode } from "react";

export interface FeatureBlockProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ title, description, icon }) => (
  <div className="flex items-start">
    <span className="flex-shrink-0 rounded-lg bg-gray-800 p-4">{icon}</span>

    <div className="ml-4">
      <h2 className="text-lg font-bold">{title}</h2>

      <p className="mt-1 text-sm text-gray-300">{description}</p>
    </div>
  </div>
);

export default FeatureBlock;
