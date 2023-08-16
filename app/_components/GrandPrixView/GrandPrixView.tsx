import { GrandPrix } from "../../_model/Season";
import {
  formatQualificationData,
  formatSprintData,
  formatWdcData,
  formatWccData,
} from "../../_utils/tableDataFormatter";
import GrandPrixInfoHeader from "../GrandPrixInfoHeader";
import Table from "../Table";

interface GrandPrixViewProps {
  season: string;
  grandprix: GrandPrix;
}

const GrandPrixView: React.FC<GrandPrixViewProps> = ({ season, grandprix }) => {
  const eventType =
    grandprix.EventFormat === "conventional" ? "Conventional weekend" : "Sprint weekend";

  const sessions = [
    {
      name: grandprix.Session1,
      date: new Date(grandprix.Session1Date ?? grandprix.Session1DateUtc),
    },
    {
      name: grandprix.Session2,
      date: new Date(grandprix.Session2Date ?? grandprix.Session2DateUtc),
    },
    {
      name: grandprix.Session3,
      date: new Date(grandprix.Session3Date ?? grandprix.Session3DateUtc),
    },
    {
      name: grandprix.Session4,
      date: new Date(grandprix.Session4Date ?? grandprix.Session4DateUtc),
    },
    {
      name: grandprix.Session5,
      date: new Date(grandprix.Session5Date ?? grandprix.Session5DateUtc),
    },
  ];

  const { qualifyingResults, sprintResults, raceResults } = grandprix;

  let qualifyingTableData: string[][] = [];
  if (qualifyingResults) qualifyingTableData = formatQualificationData(qualifyingResults);

  let sprintTableData: string[][] = [];
  if (sprintResults) sprintTableData = formatSprintData(sprintResults);

  let raceTableData: string[][] = [];
  if (raceResults) raceTableData = formatSprintData(raceResults);

  const { wdcStandings, wccStandings } = grandprix;

  let wdcTableData: string[][] = [];
  if (wdcStandings) wdcTableData = formatWdcData(wdcStandings);

  let wccTableData: string[][] = [];
  if (wccStandings) wccTableData = formatWccData(wccStandings);

  const wdcStandingsTitle =
    grandprix.EventDate < new Date()
      ? `World Drivers' Championship after the ${grandprix.EventName}`
      : `World Drivers' Championship heading into the ${grandprix.EventName}`;

  const wccStandingsTitle =
    grandprix.EventDate < new Date()
      ? `World Constructors' Championship after the ${grandprix.EventName}`
      : `World Constructors' Championship heading into the ${grandprix.EventName}`;
  return (
    <div className="mx-auto max-w-screen-lg">
      <GrandPrixInfoHeader
        eventName={
          grandprix.OfficialEventName !== ""
            ? grandprix.OfficialEventName
            : `${grandprix.EventName} ${season}`
        }
        location={grandprix.Location}
        country={grandprix.Country}
        startDate={grandprix.Session1DateUtc}
        endDate={grandprix.Session5DateUtc}
        eventType={eventType}
      />
      <div className="px-4 mt-8">
        <div className="mt-4">
          <div className="flex justify-between flex-col md:flex-row">
            {sessions.map((session) => (
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {session.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  {session.date.toLocaleDateString([], {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  {session.date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="my-4 border-[1px] border-gray-200 dark:border-gray-800"></div>
      </div>
      {raceResults && (
        <Table
          title="Race results"
          headers={["Position", "Driver", "Team", "Grid", "Time", "Fastest lap", "Points"]}
          data={raceTableData}
        />
      )}
      {sprintResults && (
        <Table
          title="Sprint results"
          headers={["Position", "Driver", "Team", "Grid", "Time", "Fastest lap", "Points"]}
          data={sprintTableData}
        />
      )}
      {qualifyingResults && (
        <Table
          title="Qualifying results"
          headers={["Position", "Driver", "Team", "Q1", "Q2", "Q3"]}
          data={qualifyingTableData}
        />
      )}
      {(raceResults || sprintResults || qualifyingResults) && (
        <div className="mx-4 my-4 border-[1px] border-gray-200 dark:border-gray-800"></div>
      )}
      {wdcStandings && (
        <Table
          title={wdcStandingsTitle}
          headers={["Position", "Driver #", "Driver", "Team", "Points", "Wins"]}
          data={wdcTableData}
        />
      )}
      {wccStandings && (
        <Table
          title={wccStandingsTitle}
          headers={["Position", "Team", "Points", "Wins"]}
          data={wccTableData}
        />
      )}
    </div>
  );
};

export default GrandPrixView;
