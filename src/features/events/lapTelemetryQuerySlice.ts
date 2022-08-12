import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { Lap } from "../../model/Lap";
import { LapData } from "../../model/LapTelemetry";

export interface DriverQuery {
  number: string;
  name: string;
  abbreviation: string;
}

interface DriverTelemetry {
  driver: DriverQuery;
  lap: string;
}

const initialState: DriverTelemetry = {
  driver: {
    number: "",
    name: "",
    abbreviation: "",
  },
  lap: "",
};

export const lapTelemetryQuerySlice = createSlice({
  name: "laps",
  initialState,
  reducers: {
    setDriver: (state, action: PayloadAction<DriverQuery>) => {
      state.driver = action.payload;
    },
    setLap: (state, action: PayloadAction<string>) => {
      state.lap = action.payload;
    },
  },
});

export const { setDriver, setLap } = lapTelemetryQuerySlice.actions;
export const selectLapTelemetryQuery = (state: AppState) => state.lapTelemetryQuery;
export default lapTelemetryQuerySlice.reducer;
