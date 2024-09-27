import { createStore } from "zustand";
import { Account } from "./models/account.model";

type AccountStore = {
  account: Account | null;
  setAccount: (account: Account) => void;
  removeAccount: () => void;
};

export const accountStore = createStore<AccountStore>((set) => ({
  account: null,
  setAccount: (account) =>
    set({
      account,
    }),
  removeAccount: () => set({ account: null }),
}));
