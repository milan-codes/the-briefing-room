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
import { useAppSelector } from "../../app/hooks";
import { selectDataFilter } from "../../features/events/dataFilterSlice";
import { selectSessionData } from "../../features/events/eventTelemetrySlice";
import { selectLapTelemetry } from "../../features/events/lapTelemetrySlice";
import { getQualiFilter, getQualiUnits } from "../../utils/qualifyingDataFilters";

const Chart: React.FC = () => {
  const eventData = useAppSelector(selectSessionData);
  const lapTelemetry = useAppSelector(selectLapTelemetry);
  const dataFilter = useAppSelector(selectDataFilter);

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
    <div className="grid place-items-center h-full">
      {lapTelemetry.telemetries.length === 0 ? (
        "Telemetry data will appear here."
      ) : (
        <div className="w-11/12">
          <ResponsiveContainer height={500} width={"100%"}>
            <LineChart data={ltMerged} margin={{ top: 10, right: 5, left: 5, bottom: 10 }}>
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
                    eventData.results.find((result) => result.Abbreviation === telemetry.driver)!
                      .TeamColor
                  }`}
                  dot={false}
                  unit={`${getQualiUnits(dataFilter.activeFilter).replace(/[()]/g, "")}`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Chart;
