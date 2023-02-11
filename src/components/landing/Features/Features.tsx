import { BuildingCommunity, Medal, TrendingUp } from "tabler-icons-react";
import FeatureBlock from "./FeatureBlock";

const Features: React.FC = () => (
  <section className="bg-blue-900" id="features">
    <div className="mx-auto max-w-screen-lg px-4 py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-gray-100 text-3xl font-bold sm:text-4xl">Built by fans</h2>

        <p className="text-gray-300 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores iure fugit totam
          iste obcaecati. Consequatur ipsa quod ipsum sequi culpa delectus, cumque id tenetur
          quibusdam, quos fuga minima.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
        {featureItems.map((item) => (
          <FeatureBlock key={item.title} {...item} />
        ))}
      </div>
    </div>
  </section>
);

const featureItems = [
  {
    title: "Feature 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores iure fugit totam iste obcaecati.",
    icon: <BuildingCommunity />,
  },
  {
    title: "Feature 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores iure fugit totam iste obcaecati.",
    icon: <TrendingUp />,
  },
  {
    title: "Feature 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolores iure fugit totam iste obcaecati.",
    icon: <Medal />,
  },
];

export default Features;
