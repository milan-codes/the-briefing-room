export interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
}

export interface Driver {
  code: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
  url: string;
}

export interface DriverStanding {
  Constructors: Constructor[];
  Driver: Driver;
  points: string;
  position: string;
  positionText: string;
  wins: string;
}
