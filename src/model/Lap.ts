export interface Lap {
  Time: Date;
  DriverNumber: string;
  LapTime: Date;
  LapNumber: number;
  Stint: number;
  PitOutTime: Date;
  PitInTime: Date;
  Sector1Time: Date;
  Sector2Time: Date;
  Sector3Time: Date;
  Sector1SessionTime: Date;
  Sector2SessionTime: Date;
  Sector3SessionTime: Date;
  SpeedI1: number;
  SpeedI2: number;
  SpeedFL: number;
  SpeedST: number;
  IsPersonalBest: boolean;
  Compound: string;
  TyreLife: number;
  FreshTyre: boolean;
  LapStartTime: Date;
  Team: string;
  Driver: string;
  TrackStatus: string;
  IsAccurate: boolean;
  LapStartDate: Date;
}
