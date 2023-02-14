import { NextPage } from "next";
import Footer from "../components/landing/Footer";
import Navbar from "../components/landing/Navbar";
import { Season } from "../model/Season";

interface SeasonHubProps {
  season: Season[];
}

const SeasonHub: NextPage<SeasonHubProps> = ({ season }) => {
  // get the upcoming race from the current season
  let upcomingRaceDate = new Date();
  let upcomingRace = season[0].events[0];
  for (let i = 0; i < season[0].events.length; i++) {
    if (season[0].events[i].EventDate > upcomingRaceDate) {
      upcomingRaceDate = season[0].events[i].EventDate;
      upcomingRace = season[0].events[i];
      break;
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Season Hub</h1>
        <p className="text-gray-600 dark:text-gray-400">
          All the information you need about the {new Date().getFullYear()} Formula 1 season
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-900  p-6 shadow-lg sm:flex-row sm:justify-between">
          <strong className="text-xl text-white sm:text-xl">
            Next up: {upcomingRace.EventName}
          </strong>

          <a
            className="inline-flex items-center rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-sky-50 focus:outline-none focus:ring active:bg-white/90"
            href="/"
          >
            <span className="text-sm font-medium"> Go to event page </span>

            <svg
              className="ml-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`http://127.0.0.1:5000/racecalendar?year=${new Date().getFullYear()}`);
  const season = (await res.json()) as Season[];

  return {
    props: { season },
    revalidate: 60 * 60 * 24, // at most once in every 24 hours
  };
};

export default SeasonHub;
