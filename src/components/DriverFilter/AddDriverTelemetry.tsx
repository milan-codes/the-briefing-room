import React from "react";
import { Loader2 } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectEventQuery } from "../../features/events/eventQuerySlice";
import {
  selectLapTelemetryQuery,
  setDriver,
  setLap,
} from "../../features/events/lapTelemetryQuerySlice";
import {
  getLapTelemetryFromApi,
  removeLapTelemetry,
  selectLapTelemetry,
} from "../../features/events/lapTelemetrySlice";
import { Lap } from "../../model/Lap";
import MyListbox from "../Listbox/Listbox";

interface AddDriverTelemetryProps {
  driverList: {
    number: string;
    name: string;
    abbreviation: string;
  }[];
  laps: Lap[];
}

const AddDriverTelemetry: React.FC<AddDriverTelemetryProps> = ({ driverList, laps }) => {
  const eventQuery = useAppSelector(selectEventQuery);
  const lapTelemetryQuery = useAppSelector(selectLapTelemetryQuery);
  const lapTelemetry = useAppSelector(selectLapTelemetry);
  const dispatch = useAppDispatch();

  return (
    <div className="border-y-[1px] border-solid border-gray-200">
      <div className="relative z-50">
        <MyListbox
          options={driverList.map((driver) => ({
            id: parseInt(driver.number),
            label: driver.name,
          }))}
          placeholder="Select a driver"
          handleChange={(option) => {
            const driverData = driverList.find((driver) => driver.name === option)!;
            dispatch(setDriver(driverData));
          }}
          value={lapTelemetryQuery.driver.name}
        />
      </div>
      <div className="relative z-10">
        <MyListbox
          options={
            lapTelemetryQuery.driver.name === ""
              ? []
              : laps
                  .filter(
                    (lap) =>
                      lap.DriverNumber === lapTelemetryQuery.driver.number &&
                      lap.IsAccurate === true
                  )
                  .map((lap) => ({
                    id: lap.LapNumber,
                    label: `Lap: ${lap.LapNumber} (${determineLapType(lap)})`,
                  }))
          }
          placeholder="Select a lap to analyize"
          handleChange={(option) => dispatch(setLap(extractInteger(option)))}
          value={lapTelemetryQuery.lap}
        />
      </div>

      <button
        type="button"
        className="w-full px-6 py-3 bg-[#3772FF] text-white font-medium text-xs leading-5 rounded hover:bg-blue-700 focus:bg-blue-700 hover:cursor-pointer transition duration-150 ease-in-out disabled:transition-none disabled:hover:bg-blue-600 disabled:opacity-50 disabled:hover:cursor-default"
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            getLapTelemetryFromApi(
              eventQuery.year,
              eventQuery.grandPrix.id,
              eventQuery.session.id,
              lapTelemetryQuery.driver.abbreviation,
              lapTelemetryQuery.lap
            )
          );
        }}
        disabled={!lapTelemetryQuery.readyToSubmit}
      >
        {lapTelemetryQuery.isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin">
              <Loader2 className="h-5 w-5" />
            </div>
            <div className="ml-1">Loading telemetry</div>
          </div>
        ) : (
          "Add telemetry"
        )}
      </button>

      {lapTelemetry.telemetries.length === 0 ? (
        ""
      ) : (
        <div className="py-4">
          <h1 className="text-md font-bold">Drivers added</h1>
          <ul className="py-2">
            {lapTelemetry.telemetries.map((telemetry) => (
              <li className="py-1 flex">
                <div className="flex-1 w-5/6">
                  {telemetry.driver} (Lap {telemetry.lap})
                </div>
                <div className="flex-1 w-1/6 text-right pr-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        removeLapTelemetry({ driver: telemetry.driver, lap: telemetry.lap })
                      );
                    }}
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
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
