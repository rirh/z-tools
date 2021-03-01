import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { homeSlice } from "src/pages/Home/_store/index";
import { loginSlice } from "src/pages/Login/_store/index";

export const rootReducer = combineReducers({
  [homeSlice.name]: homeSlice.reducer,
  [loginSlice.name]: loginSlice.reducer,
});

export default configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
