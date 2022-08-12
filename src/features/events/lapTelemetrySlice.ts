import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { Lap } from "../../model/Lap";
import { LapData } from "../../model/LapTelemetry";

interface LapTelemetry {
  driver: string;
  lap: string;
  data: LapData[];
}

interface LapTelemetries {
  telemetries: LapTelemetry[];
}

const initialState: LapTelemetries = {
  telemetries: [],
};
let telemetryIndex = 0;

export const lapTelemetrySlice = createSlice({
  name: "lapTelemetries",
  initialState,
  reducers: {
    addLapTelemetry: (state, action: PayloadAction<LapTelemetry>) => {
      state.telemetries.push({
        driver: action.payload.driver,
        lap: action.payload.lap,
        data: action.payload.data,
      });
    },
    removeLapTelemetry: (state, action: PayloadAction<{ driver: string; lap: string }>) => {
      state.telemetries = state.telemetries.filter(
        (telemetry) =>
          telemetry.driver !== action.payload.driver && telemetry.lap !== action.payload.lap
      );
    },
  },
});

export const { addLapTelemetry, removeLapTelemetry } = lapTelemetrySlice.actions;
export const selectLapTelemetry = (state: AppState) => state.lapTelemetry;
export default lapTelemetrySlice.reducer;

export const getLapTelemetryFromApi =
  (
    year: number,
    round: number,
    session: number,
    driver: string,
    lap: string
  ): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch) => {
    console.log(`Loading telemetry for car ${driver} on lap ${lap}...`);
    const res = await fetch(
      `http://127.0.0.1:5000/lap?year=${year}&round=${round}&session=${session}&driver=${driver}&lap=${lap}`
    );
    console.log(`Loading telemetry for car ${driver} on lap ${lap}...done`);
    const lapTelemetry = (await res.json()) as LapData[];
    dispatch(
      addLapTelemetry({
        driver: driver,
        lap: lap,
        data: lapTelemetry,
      })
    );
  };
