import React from "react";
import { RaceCalendarListItem } from "./RaceCalendarListItem";
import { Season } from "../../_model/Season";

interface RaceCalendarProps {
  season: Season[];
  hrefPrefix: string;
}

const RaceCalendar: React.FC<RaceCalendarProps> = ({ season, hrefPrefix }) => {
  return (
    <div>
      <h1 className="text-gray-900 dark:text-gray-100 text-xl font-extrabold px-4 py-8">
        Season schedule
      </h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {season[0].events.map((event, index) => (
          <RaceCalendarListItem key={index} event={event} hrefPrefix={hrefPrefix} />
        ))}
      </ul>
    </div>
  );
};

export default RaceCalendar;
