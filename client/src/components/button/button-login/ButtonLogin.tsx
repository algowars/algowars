import { useAuth0 } from "@auth0/auth0-react";
import ButtonLight from "../button-light/ButtonLight";
import { useLocation } from "react-router-dom";

type Props = {
  className?: string;
};

const ButtonLogin = ({ className = "" }: Props) => {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <ButtonLight onClick={handleLogin} className={className}>
      Log In
    </ButtonLight>
  );
};

export default ButtonLogin;
