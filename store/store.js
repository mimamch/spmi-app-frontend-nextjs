import { configureStore } from "@reduxjs/toolkit";
import getMeReducer from "./getUserSlice";
export const store = configureStore({
  reducer: {
    getMe: getMeReducer,
  },
});
