import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { Lap } from "../../model/Lap";

interface EventTelemetry {
  drivers: string[];
  laps: Lap[];
}

const initialState: EventTelemetry = {
  drivers: [],
  laps: [],
};

export const eventTelemetrySlice = createSlice({
  name: "laps",
  initialState,
  reducers: {
    setLaps: (state, action: PayloadAction<EventTelemetry>) => {
      state.drivers = action.payload.drivers;
      state.laps = action.payload.laps;
    },
  },
});

export const getLapsFromApi =
  (year: number, round: number, session: number): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch) => {
    console.log("Loading event...");
    const res = await fetch(
      `http://127.0.0.1:5000/session?year=${year}&round=${round}&session=${session}`
    );
    console.log("Loading event...done");
    const laps = (await res.json()) as EventTelemetry;
    dispatch(setLaps(laps));
  };

export const { setLaps } = eventTelemetrySlice.actions;
export const selectSessionData = (state: AppState) => state.eventTelemetry;
export default eventTelemetrySlice.reducer;
