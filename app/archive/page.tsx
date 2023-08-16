import { NextPage } from "next";
import ArchiveListItem from "./ArchiveListItem";

const Archive: NextPage = () => {
  // create a seasons array from 1950 until the previous year
  const seasons = Array.from(
    { length: new Date().getFullYear() - 1950 },
    (_, i) => new Date().getFullYear() - (i + 1)
  );
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Season archives</h1>
      <p className="text-gray-700 dark:text-gray-300">
        The archives of past seasons can be found here
      </p>
      <div className="mt-8">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {seasons.map((season) => (
            <ArchiveListItem season={season} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Archive;
