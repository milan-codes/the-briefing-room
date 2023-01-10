import Image from "next/image";
import FeatureBlock, { FeatureBlockProps } from "./FeatureBlock";
import telemetryDemo from "../../../../public/telemetrydemo.png";

interface FeaturesProps {
  features: FeatureBlockProps[];
}

const Features: React.FC<FeaturesProps> = ({ features }) => (
  <div className="bg-[#FCFCFF] dark:bg-[#0A0F0D] min-h-screen">
    <div className="max-w-7xl px-6 pt-10 mx-auto">
      <h1 className="text-3xl pb-8 font-semibold text-center text-gray-800 dark:text-gray-200 capitalize lg:text-4xl">
        Features
      </h1>

      <div className="pt-5">
        <Image src={telemetryDemo} alt="Telemetry demo images" />
      </div>

      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
        {features.map(({ title, description, icon }, index) => (
          <FeatureBlock key={index} title={title} description={description} icon={icon} />
        ))}
      </div>
    </div>
  </div>
);

export default Features;
