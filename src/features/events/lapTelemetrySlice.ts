import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { Lap } from "../../model/Lap";
import { LapTelemtry } from "../../model/LapTelemetry";

interface LapTelemetries {
  lapTelemetries: LapTelemtry[];
}

const initialState: LapTelemetries = {
  lapTelemetries: [],
};

export const lapTelemetrySlice = createSlice({
  name: "lapTelemetries",
  initialState,
  reducers: {
    addLapTelemetry: (state, action: PayloadAction<LapTelemtry>) => {
      state.lapTelemetries.push(action.payload);
    },
  },
});

export const { addLapTelemetry } = lapTelemetrySlice.actions;
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
    const lapTelemetry = (await res.json()) as LapTelemtry;
    dispatch(addLapTelemetry(lapTelemetry));
  };
