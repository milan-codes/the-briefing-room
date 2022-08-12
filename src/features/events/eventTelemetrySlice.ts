import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { Lap } from "../../model/Lap";
import { SessionResult } from "../../model/SessionResult";

interface EventTelemetry {
  laps: Lap[];
  results: SessionResult[];
}

const initialState: EventTelemetry = {
  laps: [],
  results: [],
};

export const eventTelemetrySlice = createSlice({
  name: "laps",
  initialState,
  reducers: {
    setLaps: (state, action: PayloadAction<EventTelemetry>) => {
      state.laps = action.payload.laps;
      state.results = action.payload.results;
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
