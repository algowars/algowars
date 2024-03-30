import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

export const useAuthLoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: location.pathname === "/" ? "/dashboard" : location.pathname,
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return { handleLogin };
};
