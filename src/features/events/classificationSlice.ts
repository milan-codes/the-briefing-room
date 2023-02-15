import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { AppState } from "../../app/store";
import { DriverStanding } from "../../model/Standing";

export interface ClassificationProps {
  classification: Result[];
  standings: DriverStanding[];
}

interface Result {
  Abbrevation: string;
  BroadcastName: string;
  DriverNumber: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  TeamColor: string;
  TeamName: string;
  Position: number;
  GridPosition: number;
  Q1: number;
  Q2: number;
  Q3: number;
  Status: string;
  Points: number;
  Time: number;
}

const initialState: ClassificationProps = {
  classification: [],
  standings: [],
};

export const classificationSlice = createSlice({
  name: "classification",
  initialState,
  reducers: {
    setClassification: (state, action: PayloadAction<ClassificationProps>) => {
      state.classification = action.payload.classification;
      state.standings = action.payload.standings;
    },
  },
});

export const getClassificationFromApi =
  (year: number, round: number, session: number): ThunkAction<void, AppState, unknown, AnyAction> =>
  async (dispatch) => {
    console.log("Loading event...");
    const res = await fetch(
      `http://127.0.0.1:5000/classification?year=${year}&round=${round}&session=${session}`
    );
    console.log("Loading event...done");
    const classification = (await res.json()) as ClassificationProps;
    dispatch(setClassification(classification));
  };

export const { setClassification } = classificationSlice.actions;
export const selectClassification = (state: AppState) => state.classification;
export default classificationSlice.reducer;
