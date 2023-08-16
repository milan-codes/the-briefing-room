import NextRaceBanner from "../components/NextRaceBanner";
import Table from "../../src/components/standings/Table";
import { RaceResult, Season, Standings } from "../../src/model/Season";
import { getCountryFlag } from "../../src/pages/archive/[season]";
import RaceCalendar from "../components/RaceCalendar";
import { formatTime } from "../../src/utils/formatTime";

const SeasonHub = async () => {
  const { season, upcomingRace, previousRace } = await getRaceCalendar();
  const { latestClassification } = await getLatestRaceResult();
  const { standings } = await getStandings();

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
    <div className="mx-auto max-w-screen-lg">
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
    </div>
  );
};

const getRaceCalendar = async () => {
  const res = await fetch(`${process.env.SERVER}/racecalendar?year=${new Date().getFullYear()}`, {
    next: {
      revalidate: 60 * 60 * 24 * 7, // at most once in every week
    },
  });
  const season = (await res.json()) as Season[];

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

  return { season, upcomingRace, previousRace };
};

const getLatestRaceResult = async () => {
  const classificationRes = await fetch(
    `${process.env.SERVER}/race-classification?year=${new Date().getFullYear()}`,
    {
      next: {
        revalidate: 60 * 60 * 24, // at most once in every 24 hours
      },
    }
  );
  const latestClassification = (await classificationRes.json()) as RaceResult[];

  return { latestClassification };
};

const getStandings = async () => {
  const standingsRes = await fetch(
    `${process.env.SERVER}/standings?year=${new Date().getFullYear()}`,
    {
      next: {
        revalidate: 60 * 60 * 24, // at most once in every 24 hours
      },
    }
  );
  const standings = (await standingsRes.json()) as Standings;

  return { standings };
};

export default SeasonHub;
