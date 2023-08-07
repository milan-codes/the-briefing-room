import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Footer from "../../components/landing/Footer";
import Navbar from "../../components/landing/Navbar";
import { DriverStanding } from "../../model/Standing";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import _ from "lodash";
import Table from "../../components/standings/Table";
import { useRouter } from "next/router";

export interface StandingsProps {
  standings: DriverStanding[];
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

const Standings: NextPage<StandingsProps> = ({ standings }) => {
  const { query } = useRouter();

  const constructorStandings = _.groupBy(
    standings,
    (standing) => standing.Constructors[0].constructorId
  );

  const wdcTableData = standings.map((standing, index) => [
    `${index + 1}`,
    `${standing.Driver.permanentNumber || "N/A"}`,
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
  if (params?.season) queryParam = `?season=${params.season}`;
  const res = await fetch(`${process.env.SERVER}/standings${queryParam}`);
  const standings = (await res.json()) as DriverStanding[];
  return {
    props: {
      standings,
    },
  };
};

export default Standings;
