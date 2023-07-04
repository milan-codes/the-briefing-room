import { useAppSelector } from "../../../app/hooks";
import { selectSessionData } from "../../../features/events/eventTelemetrySlice";
import { getQualiFilter } from "../../../utils/qualifyingDataFilters";
import DataFilter from "./DataFilter";
import DriverQuery from "./DriverQuery";

const LapTelemetryQuery: React.FC = () => {
  const eventData = useAppSelector(selectSessionData);

  return (
    <form className="hidden lg:block pt-6">
      <ul
        role="list"
        className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200 dark:border-gray-700"
      >
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-300">Drivers</h1>
        {eventData.results.length === 0 ? (
          <li role="listitem" className="flex items-center text-gray-900 dark:text-gray-300">
            Drivers will appear here after you select a session.
          </li>
        ) : (
          <DriverQuery
            driverList={eventData.results.map((driverData) => ({
              number: driverData.DriverNumber.toString(),
              name: driverData.FullName,
              abbreviation: driverData.Abbreviation,
            }))}
            laps={eventData.laps}
          />
        )}

        <div>
          <h1 className="text-lg font-bold pt-1 pb-4 text-gray-900 dark:text-gray-300">
            Data filters
          </h1>
          <DataFilter options={getQualiFilter()} />
        </div>
      </ul>
    </form>
  );
};

export default LapTelemetryQuery;
