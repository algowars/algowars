import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/loader/page-loader/page-loader";
import PageRoutes from "./pages/page-routes";
import { useAccount } from "./features/account/use-account";
import { useAuthRoles } from "./features/auth/auth-roles/use-auth-roles";
import { Toaster } from "./components/ui/sonner";

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

  console.log(allCSS);
  return (
    <>
      <PageRoutes />
      <Toaster />
    </>
  );
};

export default App;
