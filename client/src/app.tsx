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

  const allCSS = [...document.styleSheets]
    .map((styleSheet) => {
      try {
        return [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
      } catch (e) {
        console.log(
          "Access to stylesheet %s is denied. Ignoring…",
          styleSheet.href
        );
      }
    })
    .filter(Boolean)
    .join("\n");

  console.log(allCSS);
  return (
    <>
      <PageRoutes />
      <Toaster />
    </>
  );
};

export default App;
