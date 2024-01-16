import { createSlice } from "@reduxjs/toolkit";
import storage from "../utils/Storage";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: storage.get("theme") ?? "dark",
  },
  reducers: {
    setDarkMode: (state) => {
      state.theme = "dark";
      storage.set("theme", "dark");
    },
    setLightMode: (state) => {
      state.theme = "light";
      storage.set("theme", "light");
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      state.theme = newTheme;
      storage.set("theme", newTheme);
    },
  },
});

export const { setDarkMode, setLightMode, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
