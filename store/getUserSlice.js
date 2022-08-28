import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  isLoading: false,
  isError: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // reducers : ,
  extraReducers: (builder) => {
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = false;
    });
    builder.addCase(getMe.rejected, (state, actions) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const getMe = createAsyncThunk("users/getMe", async (me, thunkAPI) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/me`
  );
  return response.data.data;
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
