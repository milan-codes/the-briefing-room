import React from "react";
import { GrandPrix, Season } from "../../../src/model/Season";
import { slugify } from "../../../src/utils/slugify";
import GrandPrixInfoHeader from "../../components/GrandPrixInfoHeader";
import Table from "../../../src/components/standings/Table/Table";
import {
  formatQualificationData,
  formatSprintData,
  formatWccData,
  formatWdcData,
} from "../../utils/tableDataFormatter";

const EventPreview = async ({ params }: { params: { event: string } }) => {
  const { grandprix } = await getGrandPrixData(params.event);
  const eventType =
    grandprix.EventFormat === "conventional" ? "Conventional weekend" : "Sprint weekend";

  const sessions = [
    {
      name: grandprix.Session1,
      date: new Date(grandprix.Session1Date),
    },
    {
      name: grandprix.Session2,
      date: new Date(grandprix.Session2Date),
    },
    {
      name: grandprix.Session3,
      date: new Date(grandprix.Session3Date),
    },
    {
      name: grandprix.Session4,
      date: new Date(grandprix.Session4Date),
    },
    {
      name: grandprix.Session5,
      date: new Date(grandprix.Session5Date),
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
        eventName={grandprix.OfficialEventName}
        location={grandprix.Location}
        country={grandprix.Country}
        startDate={grandprix.Session1Date}
        endDate={grandprix.Session5Date}
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

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.SERVER}/racecalendar?year=${new Date().getFullYear()}`);
  const season = (await res.json()) as Season[];

  return season[0].events.map((event) => ({
    event: slugify(event.EventName),
  }));
};

const getGrandPrixData = async (event: string) => {
  const res = await fetch(
    `${process.env.SERVER}/grandprix?year=${new Date().getFullYear()}&name=${event}`
  );
  const grandprix = (await res.json()) as GrandPrix;
  return { grandprix };
};

export default EventPreview;
