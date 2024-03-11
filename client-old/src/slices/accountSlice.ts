import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AccountModel } from "../models/AccountModel";

interface AccountState {
  account: AccountModel;
}

const initialState: AccountState = {
  account: {
    id: null,
    username: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    usePg: true,
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.account.username = action.payload;
    },
    setAccount: (state, action: PayloadAction<AccountModel>) => {
      state.account = action.payload;
    },
  },
});

export const { setUsername, setAccount } = accountSlice.actions;

export default accountSlice.reducer;
