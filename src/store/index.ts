import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import catReducer from "./slices/catSlice";

const reducer = combineReducers({
  app: appReducer,
  cat: catReducer,
});

const store = configureStore({
  reducer: reducer,
  devTools: import.meta.env.MODE !== "production",
});

export { store };

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
