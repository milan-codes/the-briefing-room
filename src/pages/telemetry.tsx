import { GetStaticProps, NextPage } from "next";
import Compobox from "../components/Combobox";
import DataFilter, { DataFilterOption } from "../components/DataFilter/DataFilter";
import { GrandPrix, Season } from "../model/Season";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ComboboxOption } from "../components/Combobox/Combobox";
import {
  selectEventQuery,
  setSeason,
  setGrandPrix,
  setSession,
} from "../features/events/eventQuerySlice";
import { conventionalEvent, sprintEvent } from "../utils/eventFormats";
import { getLapsFromApi, selectSessionData } from "../features/events/eventTelemetrySlice";
import { Divide } from "tabler-icons-react";
import MyListbox from "../components/Listbox/Listbox";
import AddDriverTelemetry from "../components/Listbox/AddDriverTelemetry";

interface TelemetryProps {
  seasons: Season[];
}

const Telemetry: NextPage<TelemetryProps> = ({ seasons }) => {
  const event = useAppSelector(selectEventQuery);
  const eventData = useAppSelector(selectSessionData);
  const dispatch = useAppDispatch();

  const seasonOptions = getSeasonOptions(seasons);
  let grandPrixOptions: ComboboxOption[] = [];
  let sessionOptions: ComboboxOption[] = [];

  const yearSelected = seasons.find((season) => season.year === event.year);
  if (yearSelected) {
    grandPrixOptions = getGrandPrixOptions(yearSelected);
    const grandPrixSelected = yearSelected.events.find(
      (gp) => gp.EventName === event.grandPrix.name
    );
    if (grandPrixSelected) sessionOptions = getSessionOptions(grandPrixSelected);
  }

  return (
    <div className="bg-white">
      <div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Telemetry</h1>

            <div className="flex items-center">
              <Compobox
                options={seasonOptions}
                placeholder="Enter year"
                handleChange={(option) => dispatch(setSeason(parseInt(option.label)))}
                value={event.year === -1 ? "" : event.year.toString()}
                error={false}
              />
              <Compobox
                options={grandPrixOptions}
                placeholder="Enter Grand Prix"
                handleChange={(option) => dispatch(setGrandPrix(option))}
                value={event.grandPrix.name}
                error={false}
              />
              <Compobox
                options={sessionOptions}
                placeholder="Enter session"
                handleChange={(session) => dispatch(setSession(session))}
                value={event.session.name}
                error={false}
              />

              <button
                type="button"
                className="inline-block ml-5 px-6 py-3 bg-blue-600 text-white font-medium text-xs leading-5 rounded hover:bg-blue-700 focus:bg-blue-700 hover:cursor-pointer transition duration-150 ease-in-out disabled:transition-none disabled:hover:bg-blue-600 disabled:opacity-50 disabled:hover:cursor-default"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(getLapsFromApi(event.year, event.grandPrix.id, event.session.id));
                }}
                disabled={!event.readyToSubmit}
              >
                Apply
              </button>
            </div>
          </div>
          <section>
            <div className="h-auto grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              <div>
                <form className="hidden lg:block pt-6">
                  <ul
                    role="list"
                    className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200"
                  >
                    <h1 className="text-lg font-bold">Drivers</h1>
                    {eventData.drivers.length === 0 ? (
                      <li role="listitem" className="flex items-center">
                        Drivers will appear here after you select a session.
                      </li>
                    ) : (
                      <AddDriverTelemetry driverList={eventData.drivers} laps={eventData.laps} />
                    )}

                    <DataFilter options={[]} />
                  </ul>
                </form>
              </div>
              <div className="lg:col-span-3 pt-6">
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

const getSeasonOptions = (seasons: Season[]): ComboboxOption[] => {
  return seasons.map(
    (season, index): ComboboxOption => ({ id: index, label: season.year.toString() })
  );
};

const getGrandPrixOptions = (season: Season): ComboboxOption[] => {
  return season.events
    .filter((gp) => gp.EventFormat !== "testing")
    .map((gp) => ({ id: gp.RoundNumber, label: gp.EventName }));
};

const getSessionOptions = (gp: GrandPrix): ComboboxOption[] => {
  if (gp.EventFormat === "sprint") return sprintEvent;
  return conventionalEvent;
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
