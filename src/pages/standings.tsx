import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Footer from "../components/landing/Footer";
import Navbar from "../components/landing/Navbar";
import { DriverStanding } from "../model/Standing";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import _ from "lodash";
import Table from "../components/standings/Table";

export interface StandingsProps {
  standings: DriverStanding[];
}

const getCountryFlag = (nationality: string) => {
  // i18n-nationality has Monaco as "Monacan" instead of "Monegasque"
  if (nationality === "Monegasque") nationality = "Monacan";

  const nationalities = require("i18n-nationality");
  nationalities.registerLocale(require("i18n-nationality/langs/en.json"));
  const countryCode = nationalities.getAlpha2Code(nationality, "en");
  if (!countryCode) return "N/A"; // Not recognised by i18n-nationality library
  return getUnicodeFlagIcon(countryCode);
};

const Standings: NextPage<StandingsProps> = ({ standings }) => {
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

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Table
        title="Latest WDC standings"
        headers={["Position", "Driver #", "Driver", "Team", "Points", "Wins"]}
        data={wdcTableData}
      />
      <Table
        title="Latest WCC standings"
        headers={["Position", "Team", "Points", "Wins"]}
        data={wccTableData}
      />
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("http://127.0.0.1:5000/standings");
  const standings = (await res.json()) as DriverStanding[];
  return {
    props: {
      standings,
    },
  };
};

export default Standings;
