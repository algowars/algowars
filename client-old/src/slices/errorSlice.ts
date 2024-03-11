import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorModel } from "../models/ErrorModel";

interface ErrorState {
  error: ErrorModel | null;
}

const initialState: ErrorState = {
  error: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorModel | null>) => {
      state.error = action.payload;
    },
    removeError: (state) => {
      state.error = null;
    },
  },
});

export const { setError, removeError } = errorSlice.actions;

export default errorSlice.reducer;
