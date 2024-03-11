import { LanguageModel } from "@/models/language/LanguageModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PreferredLanguageState {
  preferredLanguage: LanguageModel;
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
    setPreferredLanguage: (state, action: PayloadAction<LanguageModel>) => {
      state.preferredLanguage = action.payload;
    },
  },
});

export const { setPreferredLanguage } = preferredLanguageSlice.actions;

export default preferredLanguageSlice.reducer;
