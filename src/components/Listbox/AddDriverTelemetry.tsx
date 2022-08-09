import React from "react";
import { Lap } from "../../model/Lap";
import MyListbox from "./Listbox";

interface AddDriverTelemetryProps {
  driverList: string[];
  laps?: Lap[];
}

export const AddDriverTelemetry: React.FC<AddDriverTelemetryProps> = ({ driverList }) => {
  return (
    <div className="border-y-[1px] border-solid border-gray-200">
      <div className="relative z-50">
        <MyListbox
          options={driverList.map((driver) => ({
            id: parseInt(driver),
            label: `Car ${driver}`,
          }))}
          placeholder="Select a driver"
        />
      </div>
      <div className="relative z-10">
        <MyListbox options={[]} placeholder="Select a lap to analyize" />
      </div>

      <button
        type="button"
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium text-xs leading-5 rounded hover:bg-blue-700 focus:bg-blue-700 hover:cursor-pointer transition duration-150 ease-in-out disabled:transition-none disabled:hover:bg-blue-600 disabled:opacity-50 disabled:hover:cursor-default"
        onClick={(e) => {}}
      >
        Get Telemetry
      </button>
    </div>
  );
};
