import { NextPage } from "next";
import Footer from "../../../app/components/Footer";
import Navbar from "../../components/landing/Navbar";
import NextRaceBanner from "../../components/season-hub/NextRaceBanner";
import Table from "../../components/standings/Table";
import { GrandPrix, RaceResult, Season, Standings } from "../../model/Season";
import _ from "lodash";
import { getCountryFlag } from "../archive/[season]";
import RaceCalendar from "../../components/season-hub/RaceCalendar";
import { formatTime } from "../../utils/formatTime";

interface SeasonHubProps {
  season: Season[];
  upcomingRace: GrandPrix;
  previousRace: GrandPrix;
  latestClassification: RaceResult[];
  standings: Standings;
}

const SeasonHub: NextPage<SeasonHubProps> = ({
  season,
  upcomingRace,
  previousRace,
  latestClassification,
  standings,
}) => {
  let classificationTableData: string[][] = [];
  if (latestClassification) {
    classificationTableData = latestClassification.map((result) => [
      result.position.toString(),
      result.givenName + " " + result.familyName,
      result.constructorName,
      result.grid.toString(),
      result.totalRaceTimeMillis
        ? formatTime(result.totalRaceTimeMillis)
        : "DNF  (" + result.status + ")",
      result.fastestLapTime
        ? result.fastestLapRank === 1
          ? formatTime(result.fastestLapTime) + " (Fastest)"
          : formatTime(result.fastestLapTime)
        : "No time set",
      result.points === 0 ? "" : "+" + result.points.toString(),
    ]);
  }

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
      <div className="mx-auto max-w-screen-lg">
        <Navbar />
        <NextRaceBanner grandPrixName={upcomingRace.EventName} country={upcomingRace.Country} />
        <Table
          title={`${previousRace.EventName} classification`}
          headers={["Position", "Driver", "Team", "Grid", "Time", "Fastest lap", "Points"]}
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
        <RaceCalendar season={season} hrefPrefix="/season-hub" />
        <Footer />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const seasonRes = await fetch(
    `${process.env.SERVER}/racecalendar?year=${new Date().getFullYear()}`
  );
  const season = (await seasonRes.json()) as Season[];

  const classificationRes = await fetch(
    `${process.env.SERVER}/race-classification?year=${new Date().getFullYear()}`
  );
  const latestClassification = (await classificationRes.json()) as RaceResult[];

  const standingsRes = await fetch(
    `${process.env.SERVER}/standings?year=${new Date().getFullYear()}`
  );
  const standings = (await standingsRes.json()) as Standings;

  // get the upcoming race from the current season
  let upcomingRace = season[0].events[0];
  for (let i = 0; i < season[0].events.length; i++) {
    if (season[0].events[i].EventDate > new Date()) {
      upcomingRace = season[0].events[i];
      break;
    }
  }

  let previousRace = season[0].events[0];
  for (let i = 0; i < season[0].events.length; i++) {
    if (season[0].events[i].EventDate < new Date()) {
      previousRace = season[0].events[i];
    }
  }

  return {
    props: { season, upcomingRace, previousRace, latestClassification, standings },
    revalidate: 60 * 60 * 24, // at most once in every 24 hours
  };
};

export default SeasonHub;
