import { storage } from "@/common/storage/storage";
import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "dark" | "light" | "system";
}

const initialState: ThemeState = {
  theme: storage.get("theme") ?? "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
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
