import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "../slices/themeSlice";
import accountReducer from "../slices/accountSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
