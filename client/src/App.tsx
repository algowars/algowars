import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import PageRoutes from "./pages/PageRoutes";
import { setAccount } from "./slices/accountSlice";
import AccountService from "./services/AccountService";
import PageLoader from "./components/loader/page-loader/PageLoader";
import AccountDoesNotExistBanner from "./components/account-does-not-exist-banner/AccountDoesNotExistBanner";

function App() {
  const { isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();

  const [isAccountLoading, setIsAccountLoading] = useState<boolean>(false);

  const { theme } = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      setIsAccountLoading(true);
      if (user?.sub) {
        const accessToken = await getAccessTokenSilently();
        const { data } = await AccountService.getAccountBySub(
          user.sub,
          accessToken
        );
        if (data) {
          dispatch(setAccount(data));
        }
      }
      setIsAccountLoading(false);
    })();
  }, [user?.sub]);

  if (isLoading || isAccountLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className={theme}>
      {isAuthenticated ? <AccountDoesNotExistBanner /> : null}
      <PageRoutes />
    </div>
  );
}

export default App;
