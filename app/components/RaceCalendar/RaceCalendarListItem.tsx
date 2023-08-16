import React from "react";
import { ChevronRight } from "tabler-icons-react";
import Link from "next/link";
import { GrandPrix } from "../../../src/model/Season";
import { getCountryFlagByCode } from "../../../src/utils/getCountryFlagCode";
import { slugify } from "../../../src/utils/slugify";

interface RaceCalendarListItemProps {
  event: GrandPrix;
  hrefPrefix: string;
}

export const RaceCalendarListItem: React.FC<RaceCalendarListItemProps> = ({
  event,
  hrefPrefix,
}) => {
  const eventAlreadyHappened = new Date(event.EventDate) < new Date();
  const eventDoneStyle =
    "border-sky-300 dark:border-sky-700 bg-sky-100 hover:bg-sky-300 dark:bg-sky-800 hover:dark:bg-sky-700";
  const eventStillToComeStyle =
    "border-gray-200 dark:border-gray-700 bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 hover:dark:bg-gray-700";

  //Edge case
  if (event.Country === "Korea") event.Country = "South Korea";

  return (
    <li key={event.RoundNumber} className="col-span-1 shadow-sm rounded-md hover:cursor-pointer">
      <Link href={`${hrefPrefix}/${slugify(event.EventName)}`}>
        <div className="flex">
          <div className="flex-shrink-0 flex items-center justify-center w-16 bg-gray-500 dark:bg-gray-400 text-3xl rounded-l-md">
            {getCountryFlagByCode(event.Country)}
          </div>
          <div
            className={`flex-1 flex items-center justify-between border-t border-r border-b rounded-r-md truncate ${
              eventAlreadyHappened ? eventDoneStyle : eventStillToComeStyle
            }`}
          >
            <div className="flex-1 px-4 py-2 text-gray-900 dark:text-gray-100 text-sm truncate">
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
