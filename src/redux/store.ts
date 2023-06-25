import { legacy_createStore as createStore, combineReducers } from 'redux'
import { popupsStatus } from "./reducer";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const reducer = combineReducers({
    popupsStatus
})
const persistConfig = {
  key: 'TAA',
  storage,
  blacklist: ['popupsStatus'],
  // whitelist: ['walletReducer'],
}
const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)
export { store, persistor }
