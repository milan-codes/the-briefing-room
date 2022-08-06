import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { FilterIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { GetStaticProps, NextPage } from "next";
import Compobox from "../components/Combobox";
import DataFilter, { DataFilterOption } from "../components/DataFilter/DataFilter";

interface GPData {
  roundNumber: number;
  country: string;
  location: string;
  officialEventName: string;
  eventDate: Date;
  eventName: string;
  eventFormat: string;
  session1: string;
  session1Date: Date;
  session2: string;
  session2Date: Date;
  session3: string;
  session3Date: Date;
  session4: string;
  session4Date: Date;
  session5: string;
  session5Date: Date;
  f1ApiSupport: boolean;
}

interface Props {
  gpData: GPData[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("http://127.0.0.1:5000/racecalendar?year=2021&includeAll=true");
  const gpData = await res.json();
  return {
    props: {
      gpData,
    },
  };
};

const qualiFilters: DataFilterOption[] = [
  { id: 1, label: "Velocity" },
  { id: 2, label: "Throttle %" },
  { id: 3, label: "Braking %" },
];

const raceCalendarFilters: DataFilterOption[] = [
  { id: 1, label: "2021" },
  { id: 2, label: "2022" },
];

const Telemetry: NextPage<Props> = ({ gpData }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(-1);
  const [selectedGP, setSelectedGP] = useState(-1);
  const [selectedSession, setSelectedSession] = useState(-1);

  const gpYearsCombo: DataFilterOption[] = [];
  const gpYears = Object.keys(gpData).forEach((year, index) => {
    gpYearsCombo.push({ id: index, label: year });
  });

  const handleYearSelection = (year: number) => {
    setSelectedYear(year);
    console.log(selectedYear);
  };

  return (
    <div className="bg-white">
      <div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Telemetry</h1>

            <div className="flex items-center">
              <Compobox options={gpYearsCombo} placeholder="Enter year" />

              <div className="disabled:opacity-75">
                <Compobox
                  options={[
                    { id: 1, label: "Free Practice 1" },
                    { id: 2, label: "Free Practice 2" },
                    { id: 3, label: "Free Practice 3" },
                    { id: 4, label: "Qualifying" },
                    { id: 5, label: "Race" },
                  ]}
                  placeholder="Enter Grand Prix"
                />
              </div>
              <Compobox
                options={[
                  { id: 1, label: "Free Practice 1" },
                  { id: 2, label: "Free Practice 2" },
                  { id: 3, label: "Free Practice 3" },
                  { id: 4, label: "Qualifying" },
                  { id: 5, label: "Race" },
                ]}
                placeholder="Enter session"
              />

              <button
                type="button"
                className="inline-block ml-5 px-6 py-3 bg-blue-600 text-white font-medium text-xs leading-5 rounded hover:bg-blue-700 focus:bg-blue-700  transition duration-150 ease-in-out"
              >
                Apply
              </button>

              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
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

                  <DataFilter options={qualiFilters} />
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

export default Telemetry;
