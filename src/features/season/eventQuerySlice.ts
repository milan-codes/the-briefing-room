import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";

interface EventQueryState {
  year: number;
  grandPrix: string;
  session: string;
  readyToSubmit: boolean;
}

const initialState: EventQueryState = {
  year: -1,
  grandPrix: "",
  session: "",
  readyToSubmit: false,
};

export const eventQuerySlice = createSlice({
  name: "eventQuery",
  initialState,
  reducers: {
    setSeason: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
      if (state.grandPrix != "") state.grandPrix = "";
      if (state.session != "") state.session = "";
      if (state.readyToSubmit) state.readyToSubmit = false;
    },
    setGrandPrix: (state, action: PayloadAction<string>) => {
      state.grandPrix = action.payload;
      if (state.session != "") state.session = "";
      if (state.readyToSubmit) state.readyToSubmit = false;
    },
    setSession: (state, action: PayloadAction<string>) => {
      state.session = action.payload;
      state.readyToSubmit = true;
    },
  },
});

export const { setSeason, setGrandPrix, setSession } = eventQuerySlice.actions;
export const selectEventQuery = (state: AppState) => state.eventQuery;
export default eventQuerySlice.reducer;
