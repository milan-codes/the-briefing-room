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
}

export interface Season {
  year: number;
  events: GrandPrix[];
}
