import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
const reducer = combineReducers({
  app: appReducer,
});
const persistConfig = {
  key: "TAA",
  storage,
  blacklist: ["popupsStatus"],
  // whitelist: ['walletReducer'],
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE !== "production",
  middleware: [thunk],
});

const persistor = persistStore(store);
export { store, persistor };

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
