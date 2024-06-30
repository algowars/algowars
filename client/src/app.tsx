import { useAuth0 } from "@auth0/auth0-react";
import PageRoutes from "./pages/page-routes";
import { useAuthRoles } from "./features/auth/auth-roles/use-auth-roles";
import PageLoader from "./components/loader/page-loader/page-loader";
import { useAccount } from "./features/account/hooks/use-account";
import { Toaster } from "sonner";

const App = () => {
  const { isLoading } = useAuth0();

  const { isLoading: isAccountLoading } = useAccount();

  useAuthRoles();

  if (isLoading || isAccountLoading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <PageRoutes />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
