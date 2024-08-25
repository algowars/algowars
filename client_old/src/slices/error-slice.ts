import { AppError } from "@/errors/app-error.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ErrorState {
  error: AppError | null;
}

const initialState: ErrorState = {
  error: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<AppError | null>) => {
      state.error = action.payload;
    },
    removeError: (state) => {
      state.error = null;
    },
  },
});

export const { setError, removeError } = errorSlice.actions;

export default errorSlice.reducer;
