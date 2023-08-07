import React from "react";
import { GrandPrix } from "../../../model/Season";
import { slugify } from "../../../utils/slugify";
import { getCountryFlagByCode } from "../../../utils/getCountryFlagCode";
import { ChevronRight } from "tabler-icons-react";
import Link from "next/link";

interface RaceCalendarListItemProps {
  event: GrandPrix;
}

export const RaceCalendarListItem: React.FC<RaceCalendarListItemProps> = ({ event }) => {
  const eventAlreadyHappened = new Date(event.EventDate) < new Date();
  return (
    <li key={event.RoundNumber} className="col-span-1 shadow-sm rounded-md hover:cursor-pointer">
      <Link href={`season-hub/${slugify(event.EventName)}`}>
        <div className="flex">
          <div className="flex-shrink-0 flex items-center justify-center w-16 bg-gray-500 text-white text-3xl font-medium rounded-l-md">
            {getCountryFlagByCode(event.Country)}
          </div>
          <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm truncate">
              {eventAlreadyHappened ? "🏁 " : ""}
              {event.EventName}
              <p className="text-gray-500 dark:text-gray-400">
                {new Date(event.EventDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex-shrink-0 pr-2 text-gray-500 dark:text-gray-400">
              <span className="sr-only">View</span>
              <ChevronRight />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
