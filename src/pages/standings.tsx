import { GetStaticProps, NextPage } from "next";
import Footer from "../components/landing/Footer";
import Navbar from "../components/landing/Navbar";
import { DriverStanding } from "../model/Standing";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import _ from "lodash";

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
  const constructionStandings = _.groupBy(
    standings,
    (standing) => standing.Constructors[0].constructorId
  );
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-4 py-8 overflow-x-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
          Latest WDC standings
        </h1>
        <table className="min-w-full divide-y-2 divide-gray-300 dark:divide-gray-700 text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Position
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Driver #
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Driver
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Constructor
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Points
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Wins
              </th>
            </tr>
          </thead>

          <tbody className="min-w-full divide-y-2 divide-gray-300 dark:divide-gray-700 text-sm">
            {standings.map((standing, index) => (
              <tr key={standing.Driver.driverId} className="odd:bg-gray-200 dark:odd:bg-gray-800">
                <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  {standing.Driver.permanentNumber}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  {getCountryFlag(standing.Driver.nationality)} {standing.Driver.givenName}{" "}
                  {standing.Driver.familyName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  {standing.Constructors[0].name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  {standing.points}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  {standing.wins}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto max-w-screen-lg px-4 py-8 overflow-x-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
          Latest WCC standings
        </h1>
        <table className="min-w-full divide-y-2 divide-gray-300 dark:divide-gray-700 text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Position
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Constructor
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Points
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                Wins
              </th>
            </tr>
          </thead>

          <tbody className="min-w-full divide-y-2 divide-gray-300 dark:divide-gray-700 text-sm">
            {Object.keys(constructionStandings).map((key, index) => (
              <tr key={key} className="odd:bg-gray-200 dark:odd:bg-gray-800">
                <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  {constructionStandings[key][0].Constructors[0].name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  {constructionStandings[key].reduce((acc, curr) => acc + parseInt(curr.points), 0)}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
                  {constructionStandings[key].reduce((acc, curr) => acc + parseInt(curr.wins), 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
