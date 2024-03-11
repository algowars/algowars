import { combineReducers, configureStore } from "@reduxjs/toolkit";

import themeReducer from "../slices/themeSlice";
import accountReducer from "../slices/accountSlice";
import preferredLanguageSlice from "@/slices/preferredLanguageSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  account: accountReducer,
  preferredLanguage: preferredLanguageSlice,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
