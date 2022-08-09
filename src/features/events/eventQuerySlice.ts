import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { ComboboxOption } from "../../components/Combobox/Combobox";

interface EventQueryState {
  year: number;
  grandPrix: {
    id: number;
    name: string;
  };
  session: {
    id: number;
    name: string;
  };
  readyToSubmit: boolean;
}

const initialState: EventQueryState = {
  year: -1,
  grandPrix: {
    id: -1,
    name: "",
  },
  session: {
    id: -1,
    name: "",
  },
  readyToSubmit: false,
};

export const eventQuerySlice = createSlice({
  name: "eventQuery",
  initialState,
  reducers: {
    setSeason: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
      if (state.grandPrix.id != -1) state.grandPrix = { id: -1, name: "" };
      if (state.session.id != -1) state.session = { id: -1, name: "" };
      if (state.readyToSubmit) state.readyToSubmit = false;
    },
    setGrandPrix: (state, action: PayloadAction<ComboboxOption>) => {
      state.grandPrix = { id: action.payload.id, name: action.payload.label };
      if (state.session.id != -1) state.session = { id: -1, name: "" };
      if (state.readyToSubmit) state.readyToSubmit = false;
    },
    setSession: (state, action: PayloadAction<ComboboxOption>) => {
      state.session = { id: action.payload.id, name: action.payload.label };
      state.readyToSubmit = true;
    },
  },
});

export const { setSeason, setGrandPrix, setSession } = eventQuerySlice.actions;
export const selectEventQuery = (state: AppState) => state.eventQuery;
export default eventQuerySlice.reducer;
