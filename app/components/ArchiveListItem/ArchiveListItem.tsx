import Link from "next/link";
import { ChevronRight } from "tabler-icons-react";

interface ArchiveListItemProps {
  season: number;
}

const ArchiveListItem: React.FC<ArchiveListItemProps> = ({ season }) => (
  <li key={season}>
    <Link href={`/archive/${season}`} className="col-span-1 flex shadow-sm rounded-md">
      <div className="flex-shrink-0 flex items-center justify-center w-16 bg-gray-500 text-white text-sm font-medium rounded-l-md">
        {season}
      </div>
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 text-sm truncate">
          {season} season
          <p className="text-gray-500 dark:text-gray-400">Season archive</p>
        </div>
        <div className="flex-shrink-0 pr-2 text-gray-500 dark:text-gray-400">
          <span className="sr-only">View</span>
          <ChevronRight />
        </div>
      </div>
    </Link>
  </li>
);

export default ArchiveListItem;
