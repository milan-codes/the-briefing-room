import Link from "next/link";
import RaceCalendar from "../../_components/RaceCalendar/RaceCalendar";
import { Season, Standings } from "../../_model/Season";
import Table from "../../_components/Table";
import { formatWccData, formatWdcData } from "../../_utils/tableDataFormatter";

const ArchiveSeasonStandings = async ({ params }: { params: { season: string } }) => {
  const season = parseInt(params.season);
  const { standings } = await getStandings(season);
  const { raceCalendar } = await getRaceCalendar(season);

  const { wdc, wcc } = standings;

  let wdcTableData: string[][] = [];
  if (wdc) wdcTableData = formatWdcData(wdc);

  let wccTableData: string[][] = [];
  if (wcc) {
    wccTableData = formatWccData(wcc);
  } else {
    wccTableData = []; // The WCC was not awarded until the 1958 season
  }

  return (
    <div>
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
    </div>
  );
};

export const generateStaticParams = async () => {
  // create an array of paths starting from the 1950 season up until the previous year
  return Array.from({ length: new Date().getFullYear() - 1950 }, (_, i) => ({
    season: (1950 + i).toString(),
  }));
};

const getStandings = async (season: number) => {
  const standingsRes = await fetch(`${process.env.SERVER}/standings?year=${season}`);
  const standings = (await standingsRes.json()) as Standings;

  return { standings };
};

const getRaceCalendar = async (season: number) => {
  const raceCalendarRes = await fetch(`${process.env.SERVER}/racecalendar?year=${season}`);
  const raceCalendar = (await raceCalendarRes.json()) as Season[];

  return { raceCalendar };
};

export default ArchiveSeasonStandings;
