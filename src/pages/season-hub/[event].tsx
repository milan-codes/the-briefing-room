import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { GrandPrix, Season } from "../../model/Season";
import { slugify } from "../../utils/slugify";
import Navbar from "../../components/landing/Navbar/Navbar";
import GrandPrixInfoHeader from "../../components/season-hub/GrandPrixInfoHeader/GrandPrixInfoHeader";
import Footer from "../../components/landing/Footer/Footer";
import Table from "../../components/standings/Table/Table";
import { formatTime } from "../../utils/formatTime";
import { getCountryFlag } from "../archive/[season]";

interface EventPreviewProps {
  grandprix: GrandPrix;
}

const EventPreview: React.FC<EventPreviewProps> = ({ grandprix }) => {
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
  if (qualifyingResults) {
    qualifyingTableData = qualifyingResults.map((result) => [
      result.position.toString(),
      result.givenName + " " + result.familyName,
      result.constructorName,
      result.Q1 ? formatTime(result.Q1) : "",
      result.Q2 ? formatTime(result.Q2) : "",
      result.Q3 ? formatTime(result.Q3) : "",
    ]);
  }

  let sprintTableData: string[][] = [];
  if (sprintResults) {
    sprintTableData = sprintResults.map((result) => [
      result.position.toString(),
      result.givenName + " " + result.familyName,
      result.constructorName,
      result.grid.toString(),
      result.totalRaceTimeMillis
        ? formatTime(result.totalRaceTimeMillis)
        : "DNF  (" + result.status + ")",
      result.fastestLapTime ? formatTime(result.fastestLapTime) : "No time set",
      result.points === 0 ? "" : "+" + result.points.toString(),
    ]);
  }

  let raceTableData: string[][] = [];
  if (raceResults) {
    raceTableData = raceResults.map((result) => [
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

  const { wdcStandings, wccStandings } = grandprix;

  let wdcTableData: string[][] = [];
  if (wdcStandings) {
    wdcTableData = wdcStandings.map((driver) => [
      driver.position.toString(),
      driver.driverNumber.toString(),
      getCountryFlag(driver.driverNationality) + " " + driver.givenName + " " + driver.familyName,
      driver.constructorNames[0],
      driver.points.toString(),
      driver.wins.toString(),
    ]);
  }

  let wccTableData: string[][] = [];
  if (wccStandings) {
    wccTableData = wccStandings.map((team) => [
      team.position.toString(),
      getCountryFlag(team.constructorNationality) + " " + team.constructorName,
      team.points.toString(),
      team.wins.toString(),
    ]);
  }

  const wdcStandingsTitle =
    grandprix.EventDate < new Date()
      ? `World Drivers' Championship after the ${grandprix.EventName}`
      : `World Drivers' Championship heading into the ${grandprix.EventName}`;

  const wccStandingsTitle =
    grandprix.EventDate < new Date()
      ? `World Constructors' Championship after the ${grandprix.EventName}`
      : `World Constructors' Championship heading into the ${grandprix.EventName}`;

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-lg">
        <Navbar />
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
        <Footer />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.SERVER}/racecalendar?year=${new Date().getFullYear()}`);
  const season = (await res.json()) as Season[];

  const paths = season[0].events.map((event) => ({
    params: { event: slugify(event.EventName) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let event = "";
  if (params?.event) event = params.event.toString();
  const res = await fetch(
    `${process.env.SERVER}/grandprix?year=${new Date().getFullYear()}&name=${event}`
  );
  const grandprix = (await res.json()) as GrandPrix;

  return {
    props: {
      grandprix,
    },
  };
};

export default EventPreview;
