import Link from "next/link";
import { ChevronRight } from "tabler-icons-react";
import { getCountryFlagByCode } from "../../../src/utils/getCountryFlagCode";
import { slugify } from "../../../src/utils/slugify";

interface NextRaceBannerProps {
  grandPrixName: string;
  country: string;
}

const NextRaceBanner: React.FC<NextRaceBannerProps> = ({ grandPrixName, country }) => (
  <div className="mx-auto max-w-screen-lg px-4 py-8">
    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">Season Hub</h1>
    <p className="text-gray-600 dark:text-gray-400">
      All the information you need about the {new Date().getFullYear()} Formula 1 season
    </p>
    <div className="mt-12 flex flex-col items-center gap-4 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-900  p-6 shadow-lg sm:flex-row sm:justify-between">
      <strong className="text-xl text-white sm:text-xl">
        Next up: {grandPrixName} {` ${getCountryFlagByCode(country)}`}
      </strong>

      <Link href={`season-hub/${slugify(grandPrixName)}`}>
        <div className="inline-flex items-center rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:cursor-pointer hover:bg-sky-50 focus:outline-none focus:ring active:bg-white/90">
          <span className="text-sm font-medium"> See preview </span>

          <ChevronRight />
        </div>
      </Link>
    </div>
  </div>
);

export default NextRaceBanner;