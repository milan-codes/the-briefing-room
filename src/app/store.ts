import { Action, applyMiddleware, configureStore, ThunkAction } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import eventQueryReducer from "../features/events/eventQuerySlice";
import eventTelemetryReducer from "../features/events/eventTelemetrySlice";
import lapTelemetrySlice from "../features/events/lapTelemetrySlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      eventQuery: eventQueryReducer,
      eventTelemetry: eventTelemetryReducer,
      lapTelemetry: lapTelemetrySlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
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
