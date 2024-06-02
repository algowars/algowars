import { Language } from "@/features/language/language.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PreferredLanguageState {
  preferredLanguage: Language;
}

const initialState: PreferredLanguageState = {
  preferredLanguage: {
    id: 93,
    name: "JavaScript (Node.js 18.15.0)",
    is_archived: false,
    source_file: "script.js",
    compile_cmd: null,
    run_cmd: null,
  },
};

export const preferredLanguageSlice = createSlice({
  name: "preferredLanguage",
  initialState,
  reducers: {
    setPreferredLanguage: (state, action: PayloadAction<Language>) => {
      state.preferredLanguage = action.payload;
    },
  },
});

export const { setPreferredLanguage } = preferredLanguageSlice.actions;

export default preferredLanguageSlice.reducer;
