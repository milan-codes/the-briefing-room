import React from "react";
import { getCountryFlagByCode } from "../../_utils/getCountryFlagCode";

interface GrandPrixInfoHeaderProps {
  eventName: string;
  location: string;
  country: string;
  startDate: Date;
  endDate: Date;
  eventType: string;
}

const GrandPrixInfoHeader: React.FC<GrandPrixInfoHeaderProps> = ({
  eventName,
  location,
  country,
  startDate,
  endDate,
  eventType,
}) => {
  return (
    <div className="px-4 mt-8">
      <h1 className="text-3xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">{eventName}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-1">
        <span className="font-extrabold">Location: </span> {location}, {country}{" "}
        {getCountryFlagByCode(country)}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-1">
        <span className="font-extrabold">Date: </span> {new Date(startDate).toLocaleDateString()} -{" "}
        {new Date(endDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-1">
        <span className="font-extrabold">Format: </span>
        {eventType}
      </p>
    </div>
  );
};

export default GrandPrixInfoHeader;
