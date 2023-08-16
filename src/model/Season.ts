export interface GrandPrix {
  RoundNumber: number;
  Country: string;
  Location: string;
  OfficialEventName: string;
  EventDate: Date;
  EventName: string;
  EventFormat: string;
  Session1: string;
  Session1Date: Date;
  Session2: string;
  Session2Date: Date;
  Session3: string;
  Session3Date: Date;
  Session4: string;
  Session4Date: Date;
  Session5: string;
  Session5Date: Date;
  F1ApiSupport: boolean;
  qualifyingResults?: QualifyingResult[];
  sprintResults?: SprintResult[];
  raceResults?: RaceResult[];
  wdcStandings?: WdcStanding[];
  wccStandings?: WccStanding[];
}

export interface QualifyingResult {
  number: number;
  position: number;
  Q1: number;
  Q2: number;
  Q3: number;
  driverId: string;
  driverNumber: number;
  driverCode: string;
  driverUrl: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  driverNationality: string;
  constructorId: string;
  constructorUrl: string;
  constructorName: string;
  constructorNationality: string;
}

export interface SprintResult {
  number: number;
  position: number;
  positionText: string;
  points: number;
  grid: number;
  laps: number;
  status: string;
  driverId: string;
  driverNumber: number;
  driverCode: string;
  driverUrl: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  driverNationality: string;
  constructorId: string;
  constructorUrl: string;
  constructorName: string;
  constructorNationality: string;
  totalRaceTimeMillis: number;
  totalRaceTime: number;
  fastestLapNumber: number;
  fastestLapTime: number;
}

export interface RaceResult {
  number: number;
  position: number;
  positionText: string;
  points: number;
  grid: number;
  laps: number;
  status: string;
  driverId: string;
  driverNumber: number;
  driverCode: string;
  driverUrl: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  driverNationality: string;
  constructorId: string;
  constructorUrl: string;
  constructorName: string;
  constructorNationality: string;
  totalRaceTimeMillis: number;
  totalRaceTime: number;
  fastestLapRank: number;
  fastestLapNumber: number;
  fastestLapTime: number;
  fastestLapAvgSpeedUnits: string;
  fastestLapAvgSpeed: number;
}

export interface WdcStanding {
  position: number;
  positionText: string;
  points: number;
  wins: number;
  driverId: string;
  driverNumber: number;
  driverCode: string;
  driverUrl: string;
  givenName: string;
  familyName: string;
  dateOfBirth: Date;
  driverNationality: string;
  constructorIds: string[];
  constructorUrls: string[];
  constructorNames: string[];
  constructorNationalities: string[];
}

export interface WccStanding {
  position: number;
  positionText: string;
  points: number;
  wins: number;
  constructorId: string;
  constructorUrl: string;
  constructorName: string;
  constructorNationality: string;
}

export interface Standings {
  wdc: WdcStanding[];
  wcc: WccStanding[];
}

export interface Season {
  year: number;
  events: GrandPrix[];
}
