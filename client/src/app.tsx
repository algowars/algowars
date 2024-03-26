import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/loader/page-loader/page-loader";
import PageRoutes from "./pages/page-routes";
import { useAccount } from "./features/account/use-account";
import { usePlayer } from "./features/player/use-player";

const App = () => {
  const { isLoading } = useAuth0();

  const { isLoading: isAccountLoading } = useAccount();
  const { isLoading: isPlayerLoading } = usePlayer();

  if (isLoading || isAccountLoading || isPlayerLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }
  return <PageRoutes />;
};

export default App;
