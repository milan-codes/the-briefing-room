import _ from "lodash";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAppSelector } from "../../../app/hooks";
import { selectDataFilter } from "../../../features/events/dataFilterSlice";
import { selectSessionData } from "../../../features/events/eventTelemetrySlice";
import { LapTelemetries, selectLapTelemetry } from "../../../features/events/lapTelemetrySlice";
import { getQualiUnits } from "../../../utils/qualifyingDataFilters";

const Chart: React.FC = () => {
  const eventData = useAppSelector(selectSessionData);
  const lapTelemetry = useAppSelector(selectLapTelemetry);
  const { activeFilter } = useAppSelector(selectDataFilter);

  const groupedData = groupDataByDistance(lapTelemetry, activeFilter);
  const mergedData = mergeDriverData(groupedData);

  const circuitLength = getCircuitLength(mergedData);
  const circuitTicks = getCircuitTicks(circuitLength);

  return (
    <div className="grid place-items-center h-full">
      {lapTelemetry.telemetries.length === 0 ? (
        <div className="text-gray-900 dark:text-gray-300">Telemetry data will appear here.</div>
      ) : (
        <div className="w-11/12">
          <ResponsiveContainer height={500} width={"100%"}>
            <LineChart data={mergedData} margin={{ top: 10, right: 5, left: 5, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="distance"
                domain={[0, circuitLength]}
                ticks={circuitTicks}
              >
                <Label value="Distance (m)" offset={-10} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label
                  angle={-90}
                  value={`${activeFilter} ${getQualiUnits(activeFilter).replace(" ", "")}`}
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
                    eventData.results.find((result) => result.Abbreviation === telemetry.driver)!
                      .TeamColor
                  }`}
                  dot={false}
                  unit={`${getQualiUnits(activeFilter).replace(/[()]/g, "")}`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

const groupDataByDistance = (lapTelemetry: LapTelemetries, activeFilter: string) => {
  const telemetryData = lapTelemetry.telemetries.map((telemetry) =>
    telemetry.data.map((data) => {
      const filter = activeFilter as keyof typeof data;
      return {
        driverId: telemetry.driver.toString(),
        activeDataFilter: data[filter],
        distance: data.Distance.toFixed(0),
      };
    })
  );

  return _.groupBy(telemetryData.flat(), "distance");
};

const mergeDriverData = (
  groupedData: _.Dictionary<
    {
      driverId: string;
      activeDataFilter: string | number | boolean | Date;
      distance: string;
    }[]
  >
) => {
  const mergedData: any = [];
  for (const [key, value] of Object.entries(groupedData)) {
    // loop over each group, key is the Distance of the group, value is an array of rows for that Distance
    const row = { distance: key } as any;
    for (const item of value) {
      row[item.driverId] = item.activeDataFilter;
    }
    mergedData.push(row);
  }

  return mergedData.sort((a: any, b: any) => a.distance - b.distance);
};

const getCircuitLength = (mergedData: any[]) => {
  if (mergedData.length > 0) {
    return parseInt(mergedData[mergedData.length - 1].distance);
  }
  return 0;
};

const getCircuitTicks = (circuitLength: number) => {
  return _.range(0, circuitLength, circuitLength / 10).map((tick) => parseInt(tick.toFixed(0)));
};

export default Chart;
