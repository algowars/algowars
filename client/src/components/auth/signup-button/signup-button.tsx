import { routerConfig } from "@/app/router";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode } from "react";

export interface SignupButtonProps extends ButtonProps {
  children?: ReactNode;
}

export const SignupButton = ({
  children = "Sign Up",
  ...props
}: SignupButtonProps) => {
  const { loginWithRedirect } = useAuth0();

  const handleSignup = () => {
    loginWithRedirect({
      appState: {
        returnTo: routerConfig.accountSetup.path,
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };
  return (
    <Button onClick={handleSignup} {...props}>
      {children}
    </Button>
  );
};
