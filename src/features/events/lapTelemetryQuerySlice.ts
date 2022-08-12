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
      if (state.lap !== "") state.lap = "";
    },
    setLap: (state, action: PayloadAction<string>) => {
      state.lap = action.payload;
    },
    emptyQuery: (state) => {
      state.driver = {
        number: "",
        name: "",
        abbreviation: "",
      };
      state.lap = "";
    },
  },
});

export const { setDriver, setLap, emptyQuery } = lapTelemetryQuerySlice.actions;
export const selectLapTelemetryQuery = (state: AppState) => state.lapTelemetryQuery;
export default lapTelemetryQuerySlice.reducer;
