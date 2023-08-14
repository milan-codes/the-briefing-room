import { History, Medal, TrendingUp } from "tabler-icons-react";
import FeatureBlock from "./FeatureBlock";

const Features: React.FC = () => (
  <section className="bg-blue-900" id="features">
    <div className="mx-auto max-w-screen-lg px-4 py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-gray-100 text-3xl font-bold sm:text-4xl">Built by fans</h2>

        <p className="text-gray-300 mt-4">
          Crafted by passionate F1 enthusiasts for fellow fans of the sport. This interactive
          platform offers users the opportunity to delve into the intricate world of the pinnacle of
          motorsport through telemetry data analysis.
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
    title: "Analyse telemetry data",
    description:
      "Dive into the heart of the race with our Telemetry page, where you can analyze and compare drivers' telemetry data from the exhilarating 2021 season, gaining unparalleled insights into their driving styles and strategies.",
    icon: <TrendingUp />,
  },
  {
    title: "Access the Season Hub",
    description:
      "Explore the Season Hub for comprehensive insights into the latest race results, up-to-date WDC and WCC standings, ensuring you're always in the know about the ongoing F1 season's dynamics.",
    icon: <Medal />,
  },
  {
    title: "View historical statistics",
    description:
      "Step back in time and relive the rich history of the sport with our Season Archive page, allowing you to explore WDC and WCC standings from the inaugural 1950 season to the present day, all in one convenient and nostalgic journey.",
    icon: <History />,
  },
];

export default Features;
