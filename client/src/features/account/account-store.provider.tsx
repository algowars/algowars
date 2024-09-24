import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { useAuth0 } from "@auth0/auth0-react";
import { useFindAccountBySub } from "./api/find-account-by-sub";
import { Account } from "./models/account.model";

export interface AccountStoreState {
  account: Account | null;
  setAccount: (account: Account) => void;
  removeAccount: () => void;
}

interface AccountStoreContextState {
  store: StoreApi<AccountStoreState> | null;
}

const accountStore = createStore<AccountStoreState>((set) => ({
  account: null,
  setAccount: (account: Account) =>
    set({
      account,
    }),
  removeAccount: () => set({ account: null }),
}));

const initialAccountStoreContextState: AccountStoreContextState = {
  store: null,
};

const AccountStoreContext = createContext<AccountStoreContextState>(
  initialAccountStoreContextState
);

type AccountStoreProviderProps = {
  children?: ReactNode;
};

export const AccountStoreProvider = ({
  children,
}: AccountStoreProviderProps) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [store] = useState(() => accountStore);

  const findAccountBySubMutation = useFindAccountBySub({
    mutationConfig: {
      onSuccess: (account: Account) => {
        if (account) {
          store.getState().setAccount(account);
        }
      },
    },
  });

  useEffect(() => {
    (async () => {
      if (!isLoading && isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        findAccountBySubMutation.mutate({ accessToken });
      }
    })();
  }, [isAuthenticated, isLoading]);

  const value = {
    store,
  };

  return (
    <AccountStoreContext.Provider value={value}>
      {children}
    </AccountStoreContext.Provider>
  );
};

export const useAccountStore = () => {
  const store = useContext(AccountStoreContext);

  if (!store) {
    throw new Error(
      "useAccountStore must be used within an AccountStoreProvider"
    );
  }

  return store;
};
