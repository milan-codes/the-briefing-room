"use client";

import { Provider } from "react-redux";
import { Season } from "../../src/model/Season";
import store from "../_redux/store";
import Chart from "./Chart";
import EventQuery from "./EventQuery";
import LapTelemetryQuery from "./LapTelemetryQuery";

const TelemetryView: React.FC<{ seasons: Season[] }> = ({ seasons }) => {
  return (
    <Provider store={store}>
      <main className="mx-auto max-w-screen-lg px-4">
        <div className="py-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Telemetry</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyize the telemetry data of your favorite drivers
          </p>
        </div>
        <EventQuery seasons={seasons} />
        <div className="border-2 p-4 my-2 border-solid border-gray-200 dark:border-gray-800 rounded-lg">
          <Chart />
        </div>
        <LapTelemetryQuery />
      </main>
    </Provider>
  );
};

export default TelemetryView;
