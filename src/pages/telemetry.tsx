import { GetStaticProps, NextPage } from "next";
import { Season } from "../model/Season";
import EventQueryBar from "../components/telemetry/EventQuery";
import DriverFilter from "../components/telemetry/LapTelemetryQuery";
import Chart from "../components/telemetry/Chart";
import Navbar from "../components/landing/Navbar";
import Footer from "../../app/components/Footer/Footer";

export interface TelemetryProps {
  seasons: Season[];
}

const Telemetry: NextPage<TelemetryProps> = ({ seasons }) => {
  return (
    <div className="mx-auto max-w-screen-lg">
      <Navbar />
      <main className="px-4">
        <div className="py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Telemetry</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyize the telemetry data of your favorite drivers
          </p>
        </div>
        <EventQueryBar seasons={seasons} />
        <div className="border-2 p-4 my-2 border-solid border-gray-200 dark:border-gray-800 rounded-lg">
          <Chart />
        </div>
        <DriverFilter />
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(`${process.env.SERVER}/racecalendar?year=2021&includeAll=true`);
  const seasons = (await res.json()) as Season[];
  return {
    props: {
      seasons,
    },
  };
};

export default Telemetry;
