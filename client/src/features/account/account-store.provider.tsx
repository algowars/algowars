import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { createStore, StoreApi } from "zustand";
import { useAuth0 } from "@auth0/auth0-react";
import { useFindAccountBySub } from "./api/find-account-by-sub";
import { Account } from "./models/account.model";
import { AxiosError } from "axios";

export interface AccountStoreState {
  account: Account | null;
  setAccount: (account: Account) => void;
  removeAccount: () => void;
}

interface AccountStoreContextState {
  store: StoreApi<AccountStoreState> | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  status: string | null;
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
  isLoading: true,
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  status: null,
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
  const {
    isAuthenticated: isAuthAuthenticated,
    isLoading: isAuthLoading,
    getAccessTokenSilently,
  } = useAuth0();
  const [store] = useState(() => accountStore);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const findAccountBySubMutation = useFindAccountBySub({
    mutationConfig: {
      onSuccess: (account: Account) => {
        if (account) {
          store.getState().setAccount(account);
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    },
  });

  useEffect(() => {
    (async () => {
      if (!isAuthLoading && isAuthAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        findAccountBySubMutation.mutate({
          accessToken,
        });
      }
    })();
  }, [isAuthAuthenticated, isAuthLoading]);
  const error = findAccountBySubMutation?.error as AxiosError;

  // const account = store?.getState().account;
  const value = {
    store,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    status: error?.code ?? null,
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
