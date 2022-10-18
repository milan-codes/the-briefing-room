import { GetStaticProps, NextPage } from "next";
import { Season } from "../model/Season";
import _ from "lodash";
import EventQueryBar from "../components/telemetry/EventQuery";
import DriverFilter from "../components/telemetry/LapTelemetryQuery";
import Chart from "../components/telemetry/Chart";

export interface TelemetryProps {
  seasons: Season[];
}

const Telemetry: NextPage<TelemetryProps> = ({ seasons }) => {
  return (
    <div className="bg-[#FCFCFF] dark:bg-[#0A0F0D]">
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-baseline justify-between py-6 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Telemetry</h1>
          <EventQueryBar seasons={seasons} />
        </div>
        <section>
          <div className="h-auto grid grid-cols-6 gap-x-8 gap-y-10">
            <div className="col-span-1">
              <DriverFilter />
            </div>
            <div className="col-span-5 pt-6">
              <div className="border-[1px] border-solid border-gray-200 rounded-lg h-96 lg:h-full">
                <Chart />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("http://127.0.0.1:5000/racecalendar?year=2021&includeAll=true");
  const seasons = (await res.json()) as Season[];
  return {
    props: {
      seasons,
    },
  };
};

export default Telemetry;
