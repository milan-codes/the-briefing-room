import { NextPage } from "next";
import { useEffect } from "react";
import { ChevronRight } from "tabler-icons-react";
import Footer from "../../components/landing/Footer";
import Navbar from "../../components/landing/Navbar";
import NextRaceBanner from "../../components/season-hub/NextRaceBanner";
import Table from "../../components/standings/Table";
import { ClassificationProps } from "../../features/events/classificationSlice";
import { GrandPrix, Season } from "../../model/Season";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import _ from "lodash";
import { getCountryFlag } from "../archive/[season]";
import Link from "next/link";
import { slugify } from "../../utils/slugify";

interface SeasonHubProps {
  season: Season[];
  upcomingRace: GrandPrix;
  previousRace: GrandPrix;
  latestClassification: ClassificationProps;
}

const getCountryFlagByCode = (country: string) => {
  // edge cases not correctly formatted for i18n-iso-countries
  if (country === "UAE" || country === "Abu Dhabi") country = "United Arab Emirates";

  const countries = require("i18n-iso-countries");
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  return getUnicodeFlagIcon(countries.getAlpha2Code(country, "en"));
};

const SeasonHub: NextPage<SeasonHubProps> = ({
  season,
  upcomingRace,
  previousRace,
  latestClassification,
}) => {
  //format ms to hh:mm:ss
  const formatTime = (ms: number) => {
    const milliseconds = Math.floor((ms % 1000) / 10);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const classificationTableData = latestClassification.classification.map((driver, index) => [
    `${index + 1}`,
    `${driver.DriverNumber}`,
    `${driver.FullName}`,
    `${driver.TeamName}`,
    `${driver.Time ? formatTime(driver.Time) : `DNF (${driver.Status})`}`,
    `${driver.GridPosition}`,
    `${driver.Points}`,
  ]);

  // add a + sign to driver time starting from 2nd position
  classificationTableData.forEach((row, index) => {
    if (index > 0 && !row[4].includes("DNF")) row[4] = `+${row[4]}`;
  });

  const { standings } = latestClassification;
  const constructorStandings = _.groupBy(
    standings,
    (standing) => standing.Constructors[0].constructorId
  );

  const wdcTableData = standings.map((standing, index) => [
    `${index + 1}`,
    `${standing.Driver.permanentNumber}`,
    `${getCountryFlag(standing.Driver.nationality)} ${standing.Driver.givenName} ${
      standing.Driver.familyName
    }`,
    `${standing.Constructors[0].name}`,
    `${standing.points}`,
    `${standing.wins}`,
  ]);

  const wccTableData = Object.keys(constructorStandings).map((key, index) => [
    `${index + 1}`,
    `${getCountryFlag(constructorStandings[key][0].Constructors[0].nationality)} ${
      constructorStandings[key][0].Constructors[0].name
    }`,
    `${constructorStandings[key].reduce((acc, curr) => acc + parseInt(curr.points), 0)}`,
    `${constructorStandings[key].reduce((acc, curr) => acc + parseInt(curr.wins), 0)}`,
  ]);

  // sort wccTableData by points
  wccTableData.sort((a, b) => parseInt(b[2]) - parseInt(a[2]));
  // fix the positions
  wccTableData.forEach((row, index) => (row[0] = `${index + 1}`));

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <NextRaceBanner grandPrixName={upcomingRace.EventName} />
      <div className="mx-auto max-w-screen-lg">
        <Table
          title={`${previousRace.EventName} classification`}
          headers={["Position", "Driver #", "Driver", "Team", "Time", "Grid position", "Points"]}
          data={classificationTableData}
        />
        <Table
          title="WDC standings"
          headers={["Position", "Driver #", "Driver", "Team", "Points", "Wins"]}
          data={wdcTableData}
        />
        <Table
          title="WCC standings"
          headers={["Position", "Team", "Points", "Wins"]}
          data={wccTableData}
        />
        <div>
          <h1 className="text-xl font-extrabold px-4 py-8">Season schedule</h1>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4">
            {season[0].events.map((event, index) => (
              <li key={index} className="col-span-1 shadow-sm rounded-md hover:cursor-pointer">
                <Link href={`season-hub/${slugify(event.EventName)}`}>
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 bg-gray-500 text-white text-3xl font-medium rounded-l-md">
                      {getCountryFlagByCode(event.Country)}
                    </div>
                    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 dark:border-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 rounded-r-md truncate">
                      <div className="flex-1 px-4 py-2 text-sm truncate">
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
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`http://127.0.0.1:5000/racecalendar?year=${new Date().getFullYear()}`);
  const season = (await res.json()) as Season[];

  // get the upcoming race from the current season
  let upcomingRaceDate = new Date();
  let upcomingRace = season[0].events[0];
  for (let i = 0; i < season[0].events.length; i++) {
    if (season[0].events[i].EventDate > new Date()) {
      upcomingRaceDate = season[0].events[i].EventDate;
      upcomingRace = season[0].events[i];
      break;
    }
  }

  let previousRaceDate = new Date();
  let previousRace = season[0].events[0];
  for (let i = 0; i < season[0].events.length; i++) {
    if (season[0].events[i].EventDate < new Date()) {
      previousRaceDate = season[0].events[i].EventDate;
      previousRace = season[0].events[i];
    }
  }

  const resClassification = await fetch(
    `http://127.0.0.1:5000/classification?year=${new Date().getFullYear()}&round=${
      previousRace.RoundNumber
    }&session=${5}`
  );
  const latestClassification = (await resClassification.json()) as ClassificationProps;

  return {
    props: { season, upcomingRace, previousRace, latestClassification },
    revalidate: 60 * 60 * 24, // at most once in every 24 hours
  };
};

export default SeasonHub;
