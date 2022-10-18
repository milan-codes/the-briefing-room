import { ReactNode } from "react";

export interface FeatureBlockProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ title, description, icon }) => (
  <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800">
    <div className="text-red-600">{icon}</div>
    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h1>
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
  </div>
);

export default FeatureBlock;
