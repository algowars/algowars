import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/loader/page-loader/page-loader";
import PageRoutes from "./pages/page-routes";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }
  return <PageRoutes />;
};

export default App;
