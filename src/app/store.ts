import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import seasonReducer from "../features/season/seasonSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      season: seasonReducer,
    },
  });

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
