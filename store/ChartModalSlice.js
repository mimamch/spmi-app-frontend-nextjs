import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  chartData: [],
  showChart: false,
};

export const ChartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartData: (state, action) => {
      state.chartData = [...action.payload];
    },
    setShowChart: (state) => {
      state.showChart = !state.showChart;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowChart, setChartData } = ChartSlice.actions;

export default ChartSlice.reducer;
