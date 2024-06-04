import { useAuth0 } from "@auth0/auth0-react";
import PageRoutes from "./pages/page-routes";
import { useAccount } from "./features/account/use-account";
import { useAuthRoles } from "./features/auth/auth-roles/use-auth-roles";
import PageLoader from "./components/loader/page-loader/page-loader";
import { useEffect } from "react";

const App = () => {
  const { isLoading, getAccessTokenWithPopup } = useAuth0();

  const { isLoading: isAccountLoading } = useAccount();

  useEffect(() => {
    (async () => {
      console.log(await getAccessTokenWithPopup());
    })();
  }, [getAccessTokenWithPopup]);

  useAuthRoles();

  if (isLoading || isAccountLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return <PageRoutes />;
};

export default App;
