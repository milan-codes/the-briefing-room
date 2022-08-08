import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import eventQueryReducer from "../features/season/eventQuerySlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      eventQuery: eventQueryReducer,
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
