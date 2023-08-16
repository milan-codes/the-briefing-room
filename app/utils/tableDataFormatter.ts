import {
  QualifyingResult,
  RaceResult,
  SprintResult,
  WccStanding,
  WdcStanding,
} from "../../src/model/Season";
import { formatTime } from "../../src/utils/formatTime";
import { getCountryFlag } from "./countryFlags";

export const formatQualificationData = (data: QualifyingResult[]) => {
  return data.map((result) => [
    result.position.toString(),
    result.givenName + " " + result.familyName,
    result.constructorName,
    result.Q1 ? formatTime(result.Q1) : "",
    result.Q2 ? formatTime(result.Q2) : "",
    result.Q3 ? formatTime(result.Q3) : "",
  ]);
};

export const formatSprintData = (data: SprintResult[]) => {
  return data.map((result) => [
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
};

export const formatRaceData = (data: RaceResult[]) => {
  return data.map((result) => [
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
};

export const formatWdcData = (data: WdcStanding[]) => {
  return data.map((driver) => [
    driver.position.toString(),
    driver.driverNumber?.toString() ?? "N/A",
    getCountryFlag(driver.driverNationality) + " " + driver.givenName + " " + driver.familyName,
    driver.constructorNames[0],
    driver.points.toString(),
    driver.wins.toString(),
  ]);
};

export const formatWccData = (data: WccStanding[]) => {
  return data.map((team) => [
    team.position.toString(),
    getCountryFlag(team.constructorNationality) + " " + team.constructorName,
    team.points.toString(),
    team.wins.toString(),
  ]);
};
