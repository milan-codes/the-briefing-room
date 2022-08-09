import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { Lap } from "../../model/Lap";

interface DriverTelemetry {
  driver: string;
  lap: string;
  isLoaded: boolean;
}

interface LapTelemetry {
  telemetries: DriverTelemetry[];
}

const initialState: LapTelemetry = {
  telemetries: [],
};

export const lapTelemetrySlice = createSlice({
  name: "laps",
  initialState,
  reducers: {
    addDriver: (state, action: PayloadAction<DriverTelemetry>) => {
      state.telemetries.push({
        driver: action.payload.driver,
        lap: action.payload.lap,
        isLoaded: true,
      });
    },
  },
});

export const { addDriver } = lapTelemetrySlice.actions;
export const selectTelemetryData = (state: AppState) => state.lapTelemetry;
export default lapTelemetrySlice.reducer;
