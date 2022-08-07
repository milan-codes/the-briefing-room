import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";

interface SeasonState {
  selectedSeason: number;
  readyToSubmit: boolean;
}

const initialState: SeasonState = {
  selectedSeason: -1,
  readyToSubmit: false,
};

export const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {
    setSelectedSeason: (state, action: PayloadAction<number>) => {
      state.selectedSeason = action.payload;
    },
    setReadyToSubmit: (state, action: PayloadAction<boolean>) => {
      state.readyToSubmit = action.payload;
    },
  },
});

export const { setSelectedSeason, setReadyToSubmit } = seasonSlice.actions;
export const selectSelectedSeason = (state: AppState) => state.season.selectedSeason;
export const selectReadyToSubmit = (state: AppState) => state.season.readyToSubmit;
export default seasonSlice.reducer;
