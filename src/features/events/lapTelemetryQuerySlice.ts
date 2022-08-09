import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { Lap } from "../../model/Lap";
import { LapTelemtry } from "../../model/LapTelemetry";

interface DriverTelemetry {
  driver: string;
  lap: string;
}

const initialState: DriverTelemetry = {
  driver: "",
  lap: "",
};

export const lapTelemetryQuerySlice = createSlice({
  name: "laps",
  initialState,
  reducers: {
    setDriver: (state, action: PayloadAction<string>) => {
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
