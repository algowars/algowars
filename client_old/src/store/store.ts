import { combineReducers, configureStore } from "@reduxjs/toolkit";

import themeReducer from "@/slices/theme-slice";
import accountReducer from "@/slices/account-slice";
import preferredLanguageSlice from "@/slices/preferred-language-slice";
import rolesSlice from "@/slices/roles-slice";

const rootReducer = combineReducers({
  theme: themeReducer,
  account: accountReducer,
  preferredLanguage: preferredLanguageSlice,
  roles: rolesSlice,
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
