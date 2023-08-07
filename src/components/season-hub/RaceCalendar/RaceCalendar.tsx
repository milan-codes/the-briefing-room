import React from "react";
import { Season } from "../../../model/Season";
import { RaceCalendarListItem } from "./RaceCalendarListItem";

interface RaceCalendarProps {
  season: Season[];
}

export const RaceCalendar: React.FC<RaceCalendarProps> = ({ season }) => {
  return (
    <div>
      <h1 className="text-xl font-extrabold px-4 py-8">Season schedule</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {season[0].events.map((event) => (
          <RaceCalendarListItem event={event} />
        ))}
      </ul>
    </div>
  );
};
