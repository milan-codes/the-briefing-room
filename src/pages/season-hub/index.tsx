import { NextPage } from "next";
import Footer from "../../components/landing/Footer";
import Navbar from "../../components/landing/Navbar";
import NextRaceBanner from "../../components/season-hub/NextRaceBanner";
import Table from "../../components/standings/Table";
import { ClassificationProps } from "../../features/events/classificationSlice";
import { GrandPrix, Season } from "../../model/Season";
import _ from "lodash";
import { getCountryFlag } from "../archive/[season]";
import RaceCalendar from "../../components/season-hub/RaceCalendar";
import { formatTime } from "../../utils/formatTime";

interface SeasonHubProps {
  season: Season[];
  upcomingRace: GrandPrix;
  previousRace: GrandPrix;
  latestClassification: ClassificationProps;
}

const SeasonHub: NextPage<SeasonHubProps> = ({
  season,
  upcomingRace,
  previousRace,
  latestClassification,
}) => {
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
      <div className="mx-auto max-w-screen-lg">
        <Navbar />
        <NextRaceBanner grandPrixName={upcomingRace.EventName} country={upcomingRace.Country} />
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
        <RaceCalendar season={season} />
        <Footer />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.SERVER}/racecalendar?year=${new Date().getFullYear()}`);
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
    `${process.env.SERVER}/classification?year=${new Date().getFullYear()}&round=${
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
