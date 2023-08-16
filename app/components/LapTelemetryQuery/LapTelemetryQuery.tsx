import { getQualiFilter } from "../../../src/utils/qualifyingDataFilters";
import { selectSessionData } from "../../_redux/features/events/eventTelemetrySlice";
import { useAppSelector } from "../../_redux/hooks";
import DataFilter from "./DataFilter";
import DriverQuery from "./DriverQuery";

const LapTelemetryQuery: React.FC = () => {
  const eventData = useAppSelector(selectSessionData);

  return (
    <div className="flex flex-col md:flex-row space-x-0 md:space-x-12 mt-8 text-sm font-medium text-gray-900">
      <div className="basis-1/2">
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-300">Drivers</h1>
        <DriverQuery
          driverList={eventData.results.map((driverData) => ({
            number: driverData.DriverNumber.toString(),
            name: driverData.FullName,
            abbreviation: driverData.Abbreviation,
          }))}
          laps={eventData.laps}
        />
      </div>

      <div className="my-12 border-[1px] border-gray-200 dark:border-gray-800"></div>

      <div className="basis-1/2">
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-300">Data filters</h1>
        <DataFilter options={getQualiFilter()} />
      </div>
    </div>
  );
};

export default LapTelemetryQuery;
