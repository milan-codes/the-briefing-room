import NextRaceBanner from "../components/NextRaceBanner";
import Table from "../components/Table";
import { RaceResult, Season, Standings } from "../../src/model/Season";
import RaceCalendar from "../components/RaceCalendar";
import { formatRaceData, formatWccData, formatWdcData } from "../utils/tableDataFormatter";

const SeasonHub = async () => {
  const { season, upcomingRace, previousRace } = await getRaceCalendar();
  const { latestClassification } = await getLatestRaceResult();
  const { standings } = await getStandings();
  const { wdc, wcc } = standings;

  let classificationTableData: string[][] = [];
  if (latestClassification) classificationTableData = formatRaceData(latestClassification);

  let wdcTableData: string[][] = [];
  if (wdc) wdcTableData = formatWdcData(wdc);

  let wccTableData: string[][] = [];
  if (wcc) wccTableData = formatWccData(wcc);

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
