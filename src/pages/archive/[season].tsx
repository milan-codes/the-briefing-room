import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Footer from "../../../app/components/Footer";
import Navbar from "../../components/landing/Navbar";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import _ from "lodash";
import Table from "../../components/standings/Table";
import { Season, Standings } from "../../model/Season";
import Link from "next/link";
import RaceCalendar from "../../components/season-hub/RaceCalendar/RaceCalendar";

export interface ArchiveStandingsProps {
  season: number;
  raceCalendar: Season[];
  standings: Standings;
}

export const getCountryFlag = (nationality: string) => {
  // i18n-nationality has Monaco as "Monacan" instead of "Monegasque"
  if (nationality === "Monegasque") nationality = "Monacan";

  const nationalities = require("i18n-nationality");
  nationalities.registerLocale(require("i18n-nationality/langs/en.json"));
  const countryCode = nationalities.getAlpha2Code(nationality, "en");
  if (!countryCode) return "N/A"; // Not recognised by i18n-nationality library
  return getUnicodeFlagIcon(countryCode);
};

const ArchiveSeasonStandings: NextPage<ArchiveStandingsProps> = ({
  season,
  raceCalendar,
  standings,
}) => {
  const { wdc, wcc } = standings;

  let wdcTableData: string[][] = [];
  if (wdc) {
    wdcTableData = wdc.map((driver) => [
      driver.position.toString(),
      driver.driverNumber?.toString() ?? "N/A",
      getCountryFlag(driver.driverNationality) + " " + driver.givenName + " " + driver.familyName,
      driver.constructorNames[0],
      driver.points.toString(),
      driver.wins.toString(),
    ]);
  }

  let wccTableData: string[][] = [];
  if (wcc) {
    wccTableData = wcc.map((team) => [
      team.position.toString(),
      getCountryFlag(team.constructorNationality) + " " + team.constructorName,
      team.points.toString(),
      team.wins.toString(),
    ]);
  } else {
    // The WCC was not awarded until the 1958 season
    wccTableData = [];
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-4">
        <div className="mt-8">
          <h1 className="text-3xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">
            Season archive of the {season} season
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            Take a look at the standings of the {season} season
          </p>
        </div>
        <div className="my-4 border-[1px] border-gray-200 dark:border-gray-800"></div>
      </div>
      <Table
        title={`${season} World Drivers' Championship standings`}
        headers={["Position", "Driver #", "Driver", "Team", "Points", "Wins"]}
        data={wdcTableData}
      />
      {season >= 1958 ? (
        <Table
          title={`${season} World Constructors' Championship standings`}
          headers={["Position", "Team", "Points", "Wins"]}
          data={wccTableData}
        />
      ) : (
        <div className="mx-auto max-w-screen-lg px-4 mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            The World Constructors' Championship was not awarded until the{" "}
            <Link href="/archive/1958">1958 season</Link>
          </p>
        </div>
      )}
      <div className="mx-auto max-w-screen-lg">
        <RaceCalendar season={raceCalendar} hrefPrefix={`${season}`} />
      </div>
      <Footer />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // create an array of paths starting from the 1950 season up until the previous year
  const paths = Array.from({ length: new Date().getFullYear() - 1950 }, (_, i) => ({
    params: { season: (1950 + i).toString() },
  }));

  return {
    paths,
    fallback: false, // only pre-render at build time
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const season = params?.season ?? -1;

  let queryParam = "";
  if (params?.season) queryParam = `?year=${params.season}`;
  const res = await fetch(`${process.env.SERVER}/standings${queryParam}`);
  const standings = (await res.json()) as Standings;

  const raceCalendarRes = await fetch(`${process.env.SERVER}/racecalendar?year=${season}`);
  const raceCalendar = (await raceCalendarRes.json()) as Season[];
  return {
    props: {
      season,
      raceCalendar,
      standings,
    },
  };
};

export default ArchiveSeasonStandings;
