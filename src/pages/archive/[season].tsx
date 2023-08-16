import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Footer from "../../components/landing/Footer";
import Navbar from "../../components/landing/Navbar";
import { DriverStanding } from "../../model/Standing";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import _ from "lodash";
import Table from "../../components/standings/Table";
import { useRouter } from "next/router";
import { Standings } from "../../model/Season";

export interface ArchiveStandingsProps {
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

const ArchiveSeasonStandings: NextPage<ArchiveStandingsProps> = ({ standings }) => {
  const router = useRouter();
  const { query } = router;

  const { wdc, wcc } = standings;

  let wdcTableData: string[][] = [];
  if (wdc) {
    wdcTableData = wdc.map((driver) => [
      driver.position.toString(),
      driver.driverNumber.toString(),
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
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-4">
        <div className="mt-8">
          <h1 className="text-3xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">
            Season archive of the {query.season} season
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            Take a look at the standings of the {query.season} season
          </p>
        </div>
        <div className="my-4 border-[1px] border-gray-200 dark:border-gray-800"></div>
      </div>
      <Table
        title={`${query.season} WDC standings`}
        headers={["Position", "Driver #", "Driver", "Team", "Points", "Wins"]}
        data={wdcTableData}
      />
      <Table
        title={`${query.season} WCC standings`}
        headers={["Position", "Team", "Points", "Wins"]}
        data={wccTableData}
      />
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
  let queryParam = "";
  if (params?.season) queryParam = `?year=${params.season}`;
  const res = await fetch(`${process.env.SERVER}/standings${queryParam}`);
  const standings = (await res.json()) as Standings;
  return {
    props: {
      standings,
    },
  };
};

export default ArchiveSeasonStandings;
