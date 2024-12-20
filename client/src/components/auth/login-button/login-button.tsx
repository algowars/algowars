import { Button, ButtonProps } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";

export interface LoginButtonProps extends ButtonProps {
  children?: ReactNode;
}

export const LoginButton = ({
  children = "Log In",
  ...props
}: LoginButtonProps) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      appState: {
        returnTo: location.pathname,
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <Button onClick={handleLogin} {...props}>
      {children}
    </Button>
  );
};
