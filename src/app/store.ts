import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { homeSlice } from "src/pages/Home/_store/index";
import { loginSlice } from "src/pages/Login/_store/index";

const persistConfig = {
  key: "root",
  storage: storage,
};
const middleware = [...getDefaultMiddleware({ serializableCheck: false })];

export const rootReducer = combineReducers({
  [homeSlice.name]: homeSlice.reducer,
  [loginSlice.name]: loginSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
