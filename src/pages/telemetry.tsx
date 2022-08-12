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
import { selectLapTelemetry } from "../features/events/lapTelemetrySlice";
import { CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import _, { result } from "lodash";
import { getQualiFilter, getQualiUnits } from "../utils/qualifyingDataFilters";
import { selectDataFilter, setActiveDataFilter } from "../features/events/dataFilterSlice";

interface TelemetryProps {
  seasons: Season[];
}

const Telemetry: NextPage<TelemetryProps> = ({ seasons }) => {
  const event = useAppSelector(selectEventQuery);
  const eventData = useAppSelector(selectSessionData);
  const lapTelemetry = useAppSelector(selectLapTelemetry);
  const dataFilter = useAppSelector(selectDataFilter);
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

  const df = getQualiFilter().find((filter) => filter.label === dataFilter.activeFilter)?.property;
  const lt = lapTelemetry.telemetries.map((telemetry) =>
    telemetry.data.map((data) => {
      return {
        driverId: telemetry.driver.toString(),
        activeDataFilter: data[df as keyof typeof data],
        distance: data.Distance.toFixed(0),
      };
    })
  );
  const grouped = _.groupBy(lt.flat(), "distance");
  console.log(grouped);

  const ltMerged: any = [];
  for (const [key, value] of Object.entries(grouped)) {
    // loop over each group, key is the Time of the group, value is an array of rows for that Time
    const row = { distance: key } as any;
    for (const item of value) {
      row[item.driverId] = item.activeDataFilter;
    }
    ltMerged.push(row);
  }

  ltMerged.sort((a: any, b: any) => a.distance - b.distance);
  let CIRCUIT_LENGTH = 0;
  let CIRCUIT_TICKS: number[] = [];
  if (ltMerged.length > 0) {
    CIRCUIT_LENGTH = parseInt(ltMerged[ltMerged.length - 1].distance);
    CIRCUIT_TICKS = _.range(0, CIRCUIT_LENGTH, CIRCUIT_LENGTH / 10).map((tick) =>
      parseInt(tick.toFixed(0))
    );
  }
  console.log(ltMerged);

  return (
    <div className="bg-white">
      <div>
        <main className="px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between py-6 border-b border-gray-200">
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
            <div className="h-auto grid grid-cols-6 gap-x-8 gap-y-10">
              <div className="col-span-1">
                <form className="hidden lg:block pt-6">
                  <ul
                    role="list"
                    className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200"
                  >
                    <h1 className="text-lg font-bold">Drivers</h1>
                    {eventData.results.length === 0 ? (
                      <li role="listitem" className="flex items-center">
                        Drivers will appear here after you select a session.
                      </li>
                    ) : (
                      <AddDriverTelemetry
                        driverList={eventData.results.map((driverData) => ({
                          number: driverData.DriverNumber.toString(),
                          name: driverData.FullName,
                          abbreviation: driverData.Abbreviation,
                        }))}
                        laps={eventData.laps}
                      />
                    )}

                    <div>
                      <h1 className="text-lg font-bold pt-1 pb-4">Data filters</h1>
                      <DataFilter options={getQualiFilter()} />
                    </div>
                  </ul>
                </form>
              </div>
              <div className="col-span-5 pt-6">
                <div className="border-[1px] border-solid border-gray-200 rounded-lg h-96 lg:h-full">
                  <div className="grid place-items-center h-full">
                    {lapTelemetry.telemetries.length === 0 ? (
                      "Telemetry data will appear here."
                    ) : (
                      <div className="p-10">
                        <LineChart
                          width={1400}
                          height={600}
                          data={ltMerged}
                          margin={{ top: 10, right: 5, left: 5, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            type="number"
                            dataKey="distance"
                            domain={[0, CIRCUIT_LENGTH]}
                            ticks={CIRCUIT_TICKS}
                          >
                            <Label value="Distance (m)" offset={-10} position="insideBottom" />
                          </XAxis>
                          <YAxis>
                            <Label
                              angle={-90}
                              value={`${dataFilter.activeFilter} ${getQualiUnits(
                                dataFilter.activeFilter
                              ).replace(" ", "")}`}
                              position="insideLeft"
                              style={{ textAnchor: "middle" }}
                            />
                          </YAxis>
                          <Tooltip />
                          <Legend verticalAlign="top" height={36} />
                          {lapTelemetry.telemetries.map((telemetry) => (
                            <Line
                              connectNulls={true}
                              dataKey={telemetry.driver}
                              stroke={`#${
                                eventData.results.find(
                                  (result) => result.Abbreviation === telemetry.driver
                                )!.TeamColor
                              }`}
                              dot={false}
                              unit={`${getQualiUnits(dataFilter.activeFilter).replace(
                                /[()]/g,
                                ""
                              )}`}
                            />
                          ))}
                        </LineChart>
                      </div>
                    )}
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
