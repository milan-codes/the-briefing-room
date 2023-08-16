import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppState } from "../../store";

interface DataFilterProp {
  activeFilter: string;
}

const initialState: DataFilterProp = {
  activeFilter: "",
};

export const dataFilterSlice = createSlice({
  name: "dataFilters",
  initialState,
  reducers: {
    setActiveDataFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { setActiveDataFilter } = dataFilterSlice.actions;
export const selectDataFilter = (state: AppState) => state.dataFilter;
export default dataFilterSlice.reducer;
