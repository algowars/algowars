import { useAuth0, User } from "@auth0/auth0-react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFindAccountBySub } from "./api/find-account-by-sub";
import { Account } from "./models/account.model";

export enum AccountStatus {
  NoAccount = "No Account",
  PartiallyAuthenticated = "Partially Authenticated",
  FullyAuthenticated = "Fully Authenticated",
}

type AccountProviderProps = {
  children?: ReactNode;
};

type AccountProviderState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | undefined;
  error: { message: string; status: number } | null;
  status: AccountStatus;
  account: Account | null;
  changeAccount: (newAccount: Account | null) => void;
};

const initialState: AccountProviderState = {
  isAuthenticated: false,
  isLoading: true,
  user: undefined,
  error: null,
  status: AccountStatus.NoAccount,
  account: null,
  changeAccount: () => null,
};

const AccountProviderContext =
  createContext<AccountProviderState>(initialState);

export function AccountProvider({ children, ...props }: AccountProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<{
    message: string;
    status: number;
  } | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const {
    user,
    isAuthenticated: isAuthAuthenticated,
    isLoading: isAuthLoading,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        if (!isAuthLoading && isAuthAuthenticated) {
          const token = await getAccessTokenSilently();

          if (token) {
            setAccessToken(token);
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          setError({
            message: err.message,
            status: (err as any).status || 500,
          });
        } else {
          setError({ message: "An unknown error occurred", status: 500 });
        }
      }
    })();
  }, [getAccessTokenSilently, isAuthAuthenticated, isAuthLoading]);

  const {
    data: accountData,
    isLoading: isAccountLoading,
    error: accountError,
  } = useFindAccountBySub({
    accessToken,
  }) as {
    data: any;
    isLoading: boolean;
    error: {
      response?: { data?: { message: string }; status: number };
      message: string;
    } | null;
  };

  useEffect(() => {
    setIsLoading(isAuthLoading || isAccountLoading);
    setIsAuthenticated(isAuthAuthenticated && !!accountData);
    if (accountError) {
      setError({
        message: accountError.response?.data?.message || accountError.message,
        status: accountError.response?.status || 500,
      });
    } else {
      setAccount(accountData);
    }
  }, [
    isAuthLoading,
    isAccountLoading,
    isAuthAuthenticated,
    accountData,
    accountError,
  ]);

  const changeAccount = (newAccount: Account | null) => {
    setAccount(newAccount);

    if (newAccount && isAuthAuthenticated) {
      setIsAuthenticated(true);
    }
  };

  const status = isAuthAuthenticated
    ? account
      ? AccountStatus.FullyAuthenticated
      : AccountStatus.PartiallyAuthenticated
    : AccountStatus.NoAccount;

  const value = {
    isAuthenticated,
    isLoading,
    user,
    account,
    error,
    status,
    changeAccount,
  };

  console.log("AccountProvider", value);

  return (
    <AccountProviderContext.Provider {...props} value={value}>
      {children}
    </AccountProviderContext.Provider>
  );
}

export const useAccount = () => {
  const context = useContext(AccountProviderContext);

  if (context === undefined) {
    throw new Error("useAccount must be used within a AccountProvider");
  }

  return context;
};
