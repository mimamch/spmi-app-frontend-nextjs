import { configureStore } from "@reduxjs/toolkit";
import ChartModalSlice from "./ChartModalSlice";
import getMeReducer from "./getUserSlice";
export const store = configureStore({
  reducer: {
    getMe: getMeReducer,
    chart: ChartModalSlice,
  },
});
