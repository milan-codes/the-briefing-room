import { Fragment, useEffect, useState, useRef } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { FilterIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { GetStaticProps, NextPage } from "next";
import Compobox from "../components/Combobox";
import DataFilter, { DataFilterOption } from "../components/DataFilter/DataFilter";

interface TelemetryProps {
  raceCalendars: any;
}

const conventionalEvent: DataFilterOption[] = [
  { id: 1, label: "Free Practice 1" },
  { id: 2, label: "Free Practice 2" },
  { id: 3, label: "Free Practice 3" },
  { id: 4, label: "Qualifying" },
  { id: 5, label: "Race" },
];

const sprintEvent: DataFilterOption[] = [
  { id: 1, label: "Free Practice 1" },
  { id: 2, label: "Qualifying" },
  { id: 3, label: "Free Practice 2" },
  { id: 4, label: "Sprint Race" },
  { id: 5, label: "Race" },
];

const qualiFilters: DataFilterOption[] = [
  { id: 1, label: "Velocity" },
  { id: 2, label: "Throttle %" },
  { id: 3, label: "Braking %" },
];

const Telemetry: NextPage<TelemetryProps> = ({ raceCalendars }) => {
  const [selectedYear, setSelectedYear] = useState("");

  const [selectedGP, setSelectedGP] = useState("");
  const [gpOptions, setGpOptions] = useState([{ id: -1, label: "" }]);

  const [selectedSession, setSelectedSession] = useState("");
  const [sessionOptions, setSessionOptions] = useState([{ id: -1, label: "" }]);

  const yearOptions: DataFilterOption[] = [];
  Object.keys(raceCalendars).forEach((year, index) => {
    yearOptions.push({ id: index, label: year });
  });

  useEffect(() => {
    // Update race calendar according to selected year, if no year is selected, no action needed
    if (selectedYear !== "") {
      setSelectedGP("");
      setSelectedSession("");
      setSessionOptions([]);
      const weekends: DataFilterOption[] = [];

      raceCalendars[parseInt(selectedYear)]
        .filter((gp: any) => gp.EventFormat !== "testing")
        .forEach((gp: any) => {
          weekends.push({ id: gp.roundNumber, label: gp.EventName });
        });

      setGpOptions(weekends);
    }
  }, [selectedYear]);

  useEffect(() => {
    // Update session types according to selected GP, if no gp is selected, no action needed
    if (selectedGP !== "") {
      setSelectedSession("");

      const gp = raceCalendars[parseInt(selectedYear)].find(
        (gp: any) => gp.EventName === selectedGP
      );

      if (gp.EventFormat === "conventional") {
        setSessionOptions(conventionalEvent);
      } else {
        setSessionOptions(sprintEvent);
      }
    }
  }, [selectedGP]);

  return (
    <div className="bg-white">
      <div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Telemetry</h1>

            <div className="flex items-center">
              <Compobox
                options={yearOptions}
                placeholder="Enter year"
                handleChange={setSelectedYear}
                value={selectedYear}
              />
              <Compobox
                options={gpOptions}
                placeholder="Enter Grand Prix"
                handleChange={setSelectedGP}
                value={selectedGP}
              />
              <Compobox
                options={sessionOptions}
                placeholder="Enter session"
                handleChange={setSelectedSession}
                value={selectedSession}
              />

              <button
                type="button"
                className="inline-block ml-5 px-6 py-3 bg-blue-600 text-white font-medium text-xs leading-5 rounded hover:bg-blue-700 focus:bg-blue-700  transition duration-150 ease-in-out"
              >
                Apply
              </button>
            </div>
          </div>
          <section className="pt-6 pb-24">
            <div className="h-auto grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              <form className="hidden lg:block">
                <ul
                  role="list"
                  className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200"
                >
                  <h1 className="text-lg font-bold">Data filter</h1>
                  <li role="listitem" className="flex items-center">
                    Data types will appear here after you select a session.
                  </li>

                  <DataFilter options={[]} />
                </ul>
              </form>
              <div className="lg:col-span-3">
                <div className="border-[1px] border-solid border-gray-200 rounded-lg h-96 lg:h-full">
                  <div className="grid place-items-center h-full">
                    Telemetry data will appear here.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("http://127.0.0.1:5000/racecalendar?year=2021&includeAll=true");
  const raceCalendars = await res.json();
  return {
    props: {
      raceCalendars,
    },
  };
};

export default Telemetry;
