import { Account } from "@/features/account/account.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AccountState {
  account: Account;
}

const initialState: AccountState = {
  account: {
    id: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.account.username = action.payload;
    },
    setAccount: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
  },
});

export const { setUsername, setAccount } = accountSlice.actions;

export default accountSlice.reducer;
