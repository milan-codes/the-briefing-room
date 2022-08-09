import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectEventQuery } from "../../features/events/eventQuerySlice";
import lapTelemetryQuerySlice, {
  selectLapTelemetryQuery,
  setDriver,
  setLap,
} from "../../features/events/lapTelemetryQuerySlice";
import { getLapTelemetryFromApi } from "../../features/events/lapTelemetrySlice";
import { Lap } from "../../model/Lap";
import MyListbox from "./Listbox";

interface AddDriverTelemetryProps {
  driverList: string[];
  laps: Lap[];
}

const AddDriverTelemetry: React.FC<AddDriverTelemetryProps> = ({ driverList, laps }) => {
  const eventQuery = useAppSelector(selectEventQuery);
  const lapTelemetryQuery = useAppSelector(selectLapTelemetryQuery);
  const dispatch = useAppDispatch();

  return (
    <div className="border-y-[1px] border-solid border-gray-200">
      <div className="relative z-50">
        <MyListbox
          options={driverList.map((driver) => ({
            id: parseInt(driver),
            label: `Car ${driver}`,
          }))}
          placeholder="Select a driver"
          handleChange={(option) => dispatch(setDriver(extractInteger(option)))}
        />
      </div>
      <div className="relative z-10">
        <MyListbox
          options={
            lapTelemetryQuery.driver === ""
              ? []
              : laps
                  .filter((lap) => lap.DriverNumber === lapTelemetryQuery.driver)
                  .map((lap) => ({
                    id: lap.LapNumber,
                    label: `Lap: ${lap.LapNumber} (${determineLapType(lap)})`,
                  }))
          }
          placeholder="Select a lap to analyize"
          handleChange={(option) => dispatch(setLap(extractInteger(option).toString()))}
        />
      </div>

      <button
        type="button"
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium text-xs leading-5 rounded hover:bg-blue-700 focus:bg-blue-700 hover:cursor-pointer transition duration-150 ease-in-out disabled:transition-none disabled:hover:bg-blue-600 disabled:opacity-50 disabled:hover:cursor-default"
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            getLapTelemetryFromApi(
              eventQuery.year,
              eventQuery.grandPrix.id,
              eventQuery.session.id,
              lapTelemetryQuery.driver,
              lapTelemetryQuery.lap
            )
          );
        }}
      >
        Get Telemetry
      </button>
    </div>
  );
};

const extractInteger = (str: string): string => {
  return str.replace(/[^0-9]/g, "");
};

const determineLapType = (lap: Lap): string => {
  if (lap.PitInTime === null && lap.PitOutTime !== null) return "Out lap";
  if (lap.PitInTime === null && lap.PitOutTime === null) return "Fast lap";
  if (lap.PitInTime !== null && lap.PitOutTime === null) return "In lap";
  return "Could not determine lap type";
};

export default AddDriverTelemetry;
