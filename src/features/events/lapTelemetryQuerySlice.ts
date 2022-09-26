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
  readyToSubmit: boolean;
  isLoading: boolean;
}

const initialState: DriverTelemetry = {
  driver: {
    number: "",
    name: "",
    abbreviation: "",
  },
  lap: "",
  readyToSubmit: false,
  isLoading: false,
};

export const lapTelemetryQuerySlice = createSlice({
  name: "laps",
  initialState,
  reducers: {
    setDriver: (state, action: PayloadAction<DriverQuery>) => {
      state.driver = action.payload;
      if (state.lap !== "") state.lap = "";
      state.readyToSubmit = false;
    },
    setLap: (state, action: PayloadAction<string>) => {
      state.lap = action.payload;
      state.readyToSubmit = true;
    },
    emptyQuery: (state) => {
      state.driver = {
        number: "",
        name: "",
        abbreviation: "",
      };
      state.lap = "";
      state.readyToSubmit = false;
    },
    toggleLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { setDriver, setLap, emptyQuery, toggleLoading } = lapTelemetryQuerySlice.actions;
export const selectLapTelemetryQuery = (state: AppState) => state.lapTelemetryQuery;
export default lapTelemetryQuerySlice.reducer;
